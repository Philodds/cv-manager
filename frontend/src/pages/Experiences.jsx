import { useState, useEffect } from 'react'
import api from '../services/api'

const emptyForm = {
  poste: '', entreprise: '', dateDebut: '', dateFin: '',
  enCours: false, description: '', competences: ''
}

export default function Experiences() {
  const [experiences, setExperiences] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await api.get('/experiences')
    setExperiences(res.data)
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
      const data = {
        ...form,
        competences: form.competences.split(',').map(s => s.trim()).filter(Boolean)
      }
      if (editId) {
        await api.put(`/experiences/${editId}`, data)
      } else {
        await api.post('/experiences', data)
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

  const handleEdit = (exp) => {
    setForm({
      poste: exp.poste,
      entreprise: exp.entreprise,
      dateDebut: exp.dateDebut?.split('T')[0] || '',
      dateFin: exp.dateFin?.split('T')[0] || '',
      enCours: exp.enCours,
      description: exp.description || '',
      competences: exp.competences?.join(', ') || ''
    })
    setEditId(exp._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette expérience?')) return
    await api.delete(`/experiences/${id}`)
    fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expériences</h1>
        <button
          onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editId ? 'Modifier' : 'Nouvelle expérience'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input name="poste" value={form.poste} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input name="entreprise" value={form.entreprise} onChange={handleChange} required
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compétences (séparées par virgule)</label>
            <input name="competences" value={form.competences} onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {experiences.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 text-sm">
            Aucune expérience ajoutée
          </div>
        )}
        {experiences.map(exp => (
          <div key={exp._id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{exp.poste}</h3>
                <p className="text-sm text-blue-600">{exp.entreprise}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {exp.dateDebut?.split('T')[0]} — {exp.enCours ? 'Présent' : exp.dateFin?.split('T')[0]}
                </p>
                {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                {exp.competences?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.competences.map((c, i) => (
                      <span key={i} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => handleEdit(exp)}
                  className="text-xs text-gray-500 hover:text-blue-600 px-3 py-1 border border-gray-200 rounded-lg hover:border-blue-300">
                  Modifier
                </button>
                <button onClick={() => handleDelete(exp._id)}
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