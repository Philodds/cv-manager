import { useState, useEffect } from 'react'
import api from '../services/api'

const emptyForm = {
  etablissement: '', diplome: '', specialite: '',
  dateDebut: '', dateFin: '', enCours: false, description: ''
}

export default function Formations() {
  const [formations, setFormations] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await api.get('/formations')
    setFormations(res.data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await api.put(`/formations/${editId}`, form)
      } else {
        await api.post('/formations', form)
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

  const handleEdit = (f) => {
    setForm({
      etablissement: f.etablissement,
      diplome: f.diplome,
      specialite: f.specialite || '',
      dateDebut: f.dateDebut?.split('T')[0] || '',
      dateFin: f.dateFin?.split('T')[0] || '',
      enCours: f.enCours,
      description: f.description || ''
    })
    setEditId(f._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette formation?')) return
    await api.delete(`/formations/${id}`)
    fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Formations</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editId ? 'Modifier' : 'Nouvelle formation'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
              <input name="etablissement" value={form.etablissement} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
              <input name="diplome" value={form.diplome} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
              <input name="specialite" value={form.specialite} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
              <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
              <input type="date" name="dateFin" value={form.dateFin} onChange={handleChange} disabled={form.enCours}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" name="enCours" checked={form.enCours} onChange={handleChange} />
            En cours
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
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
        {formations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">
            Aucune formation ajoutée
          </div>
        )}
        {formations.map(f => (
          <div key={f._id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{f.diplome}</h3>
                <p className="text-sm text-purple-600">{f.etablissement}</p>
                {f.specialite && <p className="text-sm text-gray-500">{f.specialite}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {f.dateDebut?.split('T')[0]} — {f.enCours ? 'Présent' : f.dateFin?.split('T')[0]}
                </p>
                {f.description && <p className="text-sm text-gray-600 mt-2">{f.description}</p>}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => handleEdit(f)}
                  className="text-xs text-gray-500 hover:text-blue-600 px-3 py-1 border border-gray-200 rounded-lg hover:border-blue-300">
                  Modifier
                </button>
                <button onClick={() => handleDelete(f._id)}
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