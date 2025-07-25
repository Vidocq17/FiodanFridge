import { supabase } from "@/supabaseClient";

async function addAliment({date_peremption, categorie, quantite, nom}) {
  const { data, error } = await supabase
    .from("aliment")
    .insert([{ nom, date_peremption, quantite, categorie }]);

  if (error) {
    console.error("Error adding aliment:", error);
    throw error;
  }
  return data;
}
async function getAliments() {
  const { data, error } = await supabase
    .from("aliment")
    .select("*")
    .order("date_peremption", { ascending: true });

  if (error) {
    console.error("Error fetching aliments:", error);
    throw error;
  }
  return data;
}
async function deleteAliment(id) {
  const { data, error } = await supabase
    .from("aliment")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting aliment:", error);
    throw error;
  }
  window.location.reload();
  return data;
}
async function updateAliment(id, { date_êremption, categorie, quantite, nom }) {
  const { data, error } = await supabase
    .from("aliment")
    .update({ date_êremption, categorie, quantite, nom })
    .eq("id", id);

  if (error) {
    console.error("Error updating aliment:", error);
    throw error;
  }
  return data;
}

export {
  addAliment,
  getAliments,
  deleteAliment,
  updateAliment
};