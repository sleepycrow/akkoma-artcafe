# Pleroma: A lightweight social networking server
# Copyright © 2017-2021 Pleroma Authors <https://pleroma.social/>
# SPDX-License-Identifier: AGPL-3.0-only

defmodule Pleroma.Web.OAuth.Scopes do
  @moduledoc """
  Functions for dealing with scopes.
  """

  alias Pleroma.Web.Plugs.OAuthScopesPlug

  @doc """
  Fetch scopes from request params.

  Note: `scopes` is used by Mastodon — supporting it but sticking to
  OAuth's standard `scope` wherever we control it
  """
  @spec fetch_scopes(map() | struct(), list()) :: list()

  def fetch_scopes(params, default) do
    parse_scopes(params["scope"] || params["scopes"] || params[:scopes], default)
  end

  def parse_scopes(scopes, _default) when is_list(scopes) do
    Enum.filter(scopes, &(&1 not in [nil, ""]))
  end

  def parse_scopes(scopes, default) when is_binary(scopes) do
    scopes
    |> to_list
    |> parse_scopes(default)
  end

  def parse_scopes(_, default) do
    default
  end

  @doc """
  Convert scopes string to list
  """
  @spec to_list(binary()) :: [binary()]
  def to_list(nil), do: []

  def to_list(str) do
    str
    |> String.trim()
    |> String.split(~r/[\s,]+/)
  end

  @doc """
  Convert scopes list to string
  """
  @spec to_string(list()) :: binary()
  def to_string(scopes), do: Enum.join(scopes, " ")

  @doc """
  Validates scopes.
  """
  @spec validate(list() | nil, list(), Pleroma.User.t()) ::
          {:ok, list()} | {:error, :missing_scopes | :unsupported_scopes, :user_is_not_an_admin}
  def validate(blank_scopes, _app_scopes, _user) when blank_scopes in [nil, []],
    do: {:error, :missing_scopes}

  def validate(scopes, app_scopes, _user) do
    validate_scopes_are_supported(scopes, app_scopes)
  end

  @spec filter_admin_scopes([String.t()], Pleroma.User.t()) :: [String.t()]
  @doc """
  Remove admin scopes for non-admins
  """
  def filter_admin_scopes(scopes, %Pleroma.User{is_admin: true}), do: scopes

  def filter_admin_scopes(scopes, %Pleroma.User{is_moderator: true}), do: scopes

  def filter_admin_scopes(scopes, _user) do
    drop_scopes = OAuthScopesPlug.filter_descendants(scopes, ["admin"])
    Enum.reject(scopes, fn scope -> Enum.member?(drop_scopes, scope) end)
  end

  defp validate_scopes_are_supported(scopes, app_scopes) do
    case OAuthScopesPlug.filter_descendants(scopes, app_scopes) do
      ^scopes -> {:ok, scopes}
      _ -> {:error, :unsupported_scopes}
    end
  end

  def contains_admin_scopes?(scopes) do
    scopes
    |> OAuthScopesPlug.filter_descendants(["admin"])
    |> Enum.any?()
  end
end
