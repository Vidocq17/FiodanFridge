import { supabase } from "../supabaseClient.js";

// ALIMENTS

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
async function updateAliment(id, { date_peremption, categorie, quantite, nom }) {
  const { data, error } = await supabase
    .from("aliment")
    .update({ date_peremption, categorie, quantite, nom })
    .eq("id", id);

  if (error) {
    console.error("Error updating aliment:", error);
    throw error;
  }
  window.location.reload();
  return data;
}

// COURSES

async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
  return data;
}

async function addCourse({ nom, description }) {
  const { data, error } = await supabase
    .from("courses")
    .insert([{ nom, description }]);

  if (error) {
    console.error("Error adding course:", error);
    throw error;
  }
  return data;
}

async function deleteCourse(id) {
  const { data, error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
  window.location.reload();
  return data;
}
async function updateCourse(id, { nom, description }) {
  const { data, error } = await supabase
    .from("courses")
    .update({ nom, description })
    .eq("id", id);

  if (error) {
    console.error("Error updating course:", error);
    throw error;
  }
  window.location.reload();
  return data;
}


export {
  addAliment,
  getAliments,
  deleteAliment,
  updateAliment,
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse
};