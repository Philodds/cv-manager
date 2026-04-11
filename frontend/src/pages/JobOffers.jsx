import { useState, useEffect } from 'react'
import api from '../services/api'

const emptyForm = { titrePoste: '', entreprise: '', description: '' }

export default function JobOffers() {
  const [offers, setOffers] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await api.get('/job-offers')
    setOffers(res.data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await api.put(`/job-offers/${editId}`, form)
      } else {
        await api.post('/job-offers', form)
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

  const handleEdit = (o) => {
    setForm({ titrePoste: o.titrePoste, entreprise: o.entreprise, description: o.description })
    setEditId(o._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette offre?')) return
    await api.delete(`/job-offers/${id}`)
    fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Offres d'emploi</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editId ? 'Modifier' : 'Nouvelle offre'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste</label>
              <input name="titrePoste" value={form.titrePoste} onChange={handleChange} required
                placeholder="Développeur React"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input name="entreprise" value={form.entreprise} onChange={handleChange} required
                placeholder="Nom de l'entreprise"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'offre</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              placeholder="Copiez ici la description complète de l'offre..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
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

      <div className="space-y-4">
        {offers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">
            Aucune offre ajoutée
          </div>
        )}
        {offers.map(o => (
          <div key={o._id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{o.titrePoste}</h3>
                <p className="text-sm text-indigo-600">{o.entreprise}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{o.description}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => handleEdit(o)}
                  className="text-xs text-gray-500 hover:text-blue-600 px-3 py-1 border border-gray-200 rounded-lg hover:border-blue-300">
                  Modifier
                </button>
                <button onClick={() => handleDelete(o._id)}
                  className="text-xs text-gray-500 hover:text-red-600 px-3 py-1 border border-gray-200 rounded-lg hover:border-red-300">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}