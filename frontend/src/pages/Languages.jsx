import { useState, useEffect } from 'react'
import api from '../services/api'

const niveaux = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Langue maternelle']
const emptyForm = { nom: '', niveau: 'Intermédiaire' }

export default function Languages() {
  const [languages, setLanguages] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await api.get('/languages')
    setLanguages(res.data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await api.put(`/languages/${editId}`, form)
      } else {
        await api.post('/languages', form)
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

  const handleEdit = (l) => {
    setForm({ nom: l.nom, niveau: l.niveau })
    setEditId(l._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer?')) return
    await api.delete(`/languages/${id}`)
    fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Langues</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
              <input name="nom" value={form.nom} onChange={handleChange} required
                placeholder="Français, Anglais..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select name="niveau" value={form.niveau} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {niveaux.map(n => <option key={n}>{n}</option>)}
              </select>
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
        {languages.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">Aucune langue ajoutée</p>
        )}
        <div className="space-y-3">
          {languages.map(l => (
            <div key={l._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
              <div>
                <span className="font-medium text-gray-800">{l.nom}</span>
                <span className="ml-3 text-sm text-pink-500">{l.niveau}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(l)} className="text-xs text-gray-400 hover:text-blue-500 px-2 py-1 border border-gray-200 rounded-lg">Modifier</button>
                <button onClick={() => handleDelete(l._id)} className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 border border-gray-200 rounded-lg">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}