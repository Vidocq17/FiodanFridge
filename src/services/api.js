import { supabase } from '../supabaseClient.js'
import { useToast } from 'vue-toastification'

const toast = useToast()

// ALIMENTS

async function addAliment({ date_peremption, categorie, quantite, nom }) {
  const { data, error } = await supabase
    .from('aliment')
    .insert([{ nom, date_peremption, quantite, categorie }])

  if (error) {
    console.error('Error adding aliment:', error)
    throw error
  }
  return data
}
async function getAliments() {
  const { data, error } = await supabase
    .from('aliment')
    .select('*')
    .order('date_peremption', { ascending: true })

  if (error) {
    console.error('Error fetching aliments:', error)
    throw error
  }
  return data
}
async function deleteAliment(id) {
  const { data, error } = await supabase.from('aliment').delete().eq('id', id)

  if (error) {
    console.error('Error deleting aliment:', error)
    throw error
  }
  window.location.reload()
  return data
}
async function updateAliment(id, { date_peremption, categorie, quantite, nom }) {
  const { data, error } = await supabase
    .from('aliment')
    .update({ date_peremption, categorie, quantite, nom })
    .eq('id', id)

  if (error) {
    console.error('Error updating aliment:', error)
    throw error
  }
  window.location.reload()
  return data
}
async function getAliment() {
  const { data, error } = await supabase.from('aliment').select('*').eq('id', id).single()

  if (error) {
    console.error('Error fetching aliment:', error)
    throw error
  }
  return data
}

// COURSES

async function getCourses() {
  const { data, error } = await supabase.from('courses').select('*')

  if (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
  return data
}

async function addCourse({ nom, description, fait, categorie }) {
  const { data, error } = await supabase
    .from('courses')
    .insert([{ nom, description, fait, categorie }])

  if (error) {
    console.error('Error adding course:', error)
    throw error
  }
  return data
}

async function deleteCourse(id) {
  const { data, error } = await supabase.from('courses').delete().eq('id', id)

  if (error) {
    console.error('Error deleting course:', error)
    throw error
  }
  return data
}
async function updateCourse(id, { nom, description, fait, categorie }) {
  const { data, error } = await supabase
    .from('courses')
    .update({ nom, description, fait, categorie })
    .eq('id', id)

  if (error) {
    console.error('Error updating course:', error)
    throw error
  }
  return data
}

// CONGELATEUR

async function passerAuCongelateur(aliment) {
  try {
    const { data, error: insertError } = await supabase.from('congelateur').insert([
      {
        nom: aliment.nom,
        quantite: aliment.quantite,
        date_congelation: new Date().toISOString().split('T')[0],
        categorie: aliment.categorie,
        etat: 'Congelé',
      },
    ])

    if (insertError) throw insertError

    const { error: deleteError } = await supabase.from('aliment').delete().eq('id', aliment.id)

    if (deleteError) throw deleteError

    toast.success(`🧊 "${aliment.nom}" est passé au congélateur !`)
    fetchAliments()
  } catch (err) {
    console.error('Erreur transfert au congélateur :', err)
    toast.error('Erreur lors du transfert au congélateur')
  }
}

async function addCongelateur(aliment) {
  return await supabase.from('congelateur').insert([aliment])
}

async function getCongelateur() {
  const { data } = await supabase.from('congelateur').select('*')
  return data
}

async function deleteCongelateur(id) {
  const { data, error } = await supabase.from('congelateur').delete().eq('id', id)

  if (error) {
    console.error('Error deleting congelateur:', error)
    throw error
  }
  return data
}

async function updateCongelateur(id, aliment) {
  const { data, error } = await supabase.from('congelateur').update(aliment).eq('id', id)

  if (error) {
    console.error('Error updating congelateur:', error)
    throw error
  }
  return data
}

export {
  addAliment,
  getAliments,
  deleteAliment,
  updateAliment,
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse,
  passerAuCongelateur,
  addCongelateur,
  getCongelateur,
  deleteCongelateur,
  updateCongelateur,
}
