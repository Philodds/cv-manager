import { useState, useEffect } from 'react'
import api from '../services/api'

const niveaux = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert']
const emptyForm = { nom: '', niveau: 'Intermédiaire', categorie: '' }

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await api.get('/skills')
    setSkills(res.data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await api.put(`/skills/${editId}`, form)
      } else {
        await api.post('/skills', form)
      }
      setForm(emptyForm)
      setEditId(null)
      setShowForm(false)
      fetchAll()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (s) => {
    setForm({ nom: s.nom, niveau: s.niveau, categorie: s.categorie || '' })
    setEditId(s._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer?')) return
    await api.delete(`/skills/${id}`)
    fetchAll()
  }

  const niveauColor = {
    'Débutant': 'bg-gray-100 text-gray-600',
    'Intermédiaire': 'bg-blue-50 text-blue-600',
    'Avancé': 'bg-green-50 text-green-600',
    'Expert': 'bg-purple-50 text-purple-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Compétences</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editId ? 'Modifier' : 'Nouvelle compétence'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compétence</label>
              <input name="nom" value={form.nom} onChange={handleChange} required
                placeholder="React, Python..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select name="niveau" value={form.niveau} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {niveaux.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <input name="categorie" value={form.categorie} onChange={handleChange}
                placeholder="Frontend, Backend..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {skills.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">Aucune compétence ajoutée</p>
        )}
        <div className="flex flex-wrap gap-3">
          {skills.map(s => (
            <div key={s._id} className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-sm font-medium text-gray-700">{s.nom}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${niveauColor[s.niveau]}`}>{s.niveau}</span>
              {s.categorie && <span className="text-xs text-gray-400">{s.categorie}</span>}
              <button onClick={() => handleEdit(s)} className="text-xs text-gray-400 hover:text-blue-500 ml-1">✎</button>
              <button onClick={() => handleDelete(s._id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}