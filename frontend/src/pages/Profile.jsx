import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Profile() {
  const [form, setForm] = useState({
    titreProfessionnel: '',
    resume: '',
    telephone: '',
    adresse: '',
    linkedIn: '',
    github: '',
    portfolio: '',
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile')
        setForm({
          titreProfessionnel: res.data.titreProfessionnel || '',
          resume: res.data.resume || '',
          telephone: res.data.telephone || '',
          adresse: res.data.adresse || '',
          linkedIn: res.data.linkedIn || '',
          github: res.data.github || '',
          portfolio: res.data.portfolio || '',
        })
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      await api.put('/profile', form)
      setSuccess('Profil mis à jour avec succès!')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Chargement...</p>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Mon Profil</h1>
      <p className="text-gray-500 text-sm mb-6">Ces informations seront utilisées pour générer vos documents</p>

      {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</div>}
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
          <input
            name="titreProfessionnel"
            value={form.titreProfessionnel}
            onChange={handleChange}
            placeholder="Ex: Développeur Full Stack"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Résumé professionnel</label>
          <textarea
            name="resume"
            value={form.resume}
            onChange={handleChange}
            rows={4}
            placeholder="Décrivez votre profil en quelques phrases..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              placeholder="Casablanca, Maroc"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              name="linkedIn"
              value={form.linkedIn}
              onChange={handleChange}
              placeholder="linkedin.com/in/..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="github.com/..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
            <input
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="monsite.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>

      </form>
    </div>
  )
}