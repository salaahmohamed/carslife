import { createClient } from "@supabase/supabase-js";
import type { CarProps } from "@types";

const supabaseUrl = "https://jhsvkwthoxisojgiegvl.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchCarsFromSupabase(): Promise<CarProps[]> {
  const { data, error } = (await supabase.from("cars").select("*")) as {
    data: CarProps[] | null;
    error: any;
  };
  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  console.log("Fetched cars from Supabase:", data);
  return data ?? [];
}
