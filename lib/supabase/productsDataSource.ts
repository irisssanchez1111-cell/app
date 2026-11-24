import { createClient } from "@/lib/supabase/server";

export const ProductsDataSource = {
  async getAll() {
    const sb = await createClient();
    const { data, error } = await sb.from("Products").select("*");
    if (error) throw error;
    return data;
  },
  async getById(id: number) {
    const sb = await createClient();
    const { data, error } = await sb.from("Products").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },
  async create(product: any) {
    const sb = await createClient();
    const { data, error } = await sb.from("Products").insert(product).select().single();
    if (error) throw error;
    return data;
  },
  async update(id: number, product: any) {
    const sb = await createClient();
    const { data, error } = await sb.from("Products").update(product).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id: number) {
    const sb = await createClient();
    const { error } = await sb.from("Products").delete().eq("id", id);
    if (error) throw error;
  },
};