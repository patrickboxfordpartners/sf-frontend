"use server";

import { apiJson } from "@/lib/apiClient";
import type { Address, AddressCreate, AddressUpdate } from "@/lib/contacts/types";

/**
 * Server-side address API functions.
 * All operations are scoped to a specific contact.
 */

export async function listAddresses(contactId: number): Promise<Address[]> {
  return apiJson<Address[]>(`/api/v1/contacts/${contactId}/addresses`);
}

export async function createAddress(
  contactId: number,
  payload: AddressCreate,
): Promise<Address> {
  return apiJson<Address>(`/api/v1/contacts/${contactId}/addresses`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAddress(
  addressId: number,
  payload: AddressUpdate,
): Promise<Address> {
  return apiJson<Address>(`/api/v1/addresses/${addressId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteAddress(addressId: number): Promise<void> {
  await apiJson<void>(`/api/v1/addresses/${addressId}`, {
    method: "DELETE",
  });
}
