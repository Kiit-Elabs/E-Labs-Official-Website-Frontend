import { useState, useEffect, useCallback } from 'react'
import MemberCard from '../subComponents/MemberCard'
import { useNavigate } from 'react-router-dom'

function Members({ isHomePage = false }) {
  const navigate = useNavigate()
  const [selectedDomain, setSelectedDomain] = useState('')
  const [allMembers, setAllMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCards, setVisibleCards] = useState(4)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:8000/member/get-members')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        if (!data?.members || !Array.isArray(data.members)) {
          throw new Error('Invalid data format received from API')
        }

        const sortedMembers = data.members.sort(
          (a, b) => b.priority - a.priority
        )
        setAllMembers(sortedMembers)
      } catch (err) {
        console.error('Error fetching members:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth
    if (width < 640) setVisibleCards(1)
    else if (width < 768) setVisibleCards(2)
    else if (width < 1024) setVisibleCards(3)
    else setVisibleCards(4)
  }, [])

  useEffect(() => {
    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [updateVisibleCards])

  const coordinators = allMembers.filter((member) =>
    member?.designation?.toLowerCase()?.includes('coordinator')
  )

  const leadsAndAssistantLeads = allMembers.filter((member) =>
    member?.designation?.toLowerCase()?.includes('lead')
  )

  const regularMembers = allMembers.filter(
    (member) =>
      !member?.designation?.toLowerCase()?.includes('coordinator') &&
      !member?.designation?.toLowerCase()?.includes('lead')
  )

  const domains = [
    ...new Set(
      allMembers.flatMap((member) =>
        Array.isArray(member?.domain) ? member.domain : []
      )
    ),
  ].filter(Boolean)

  useEffect(() => {
    if (domains.length > 0 && selectedDomain === '') {
      setSelectedDomain(domains[0])
    }
  }, [domains, selectedDomain])

  const filteredMembers = selectedDomain
    ? regularMembers.filter(
        (member) =>
          Array.isArray(member?.domain) &&
          member.domain.includes(selectedDomain)
      )
    : regularMembers

  const handleViewMore = () => navigate('/members')

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-textColor1"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg max-w-2xl mx-auto">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </div>
    )

  if (isHomePage) {
    const leadershipMembers = [...coordinators, ...leadsAndAssistantLeads]
    const displayMembers = leadershipMembers.slice(0, visibleCards)

    return (
      <div className="w-full flex flex-col items-center justify-center text-center py-16 px-4 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)]">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-textColor1 tracking-tight">
          MEET OUR TEAM
        </h1>

        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {displayMembers.map((member) => (
              <div
                key={member?._id}
                className="w-full"
                style={{
                  minWidth: '300px',
                  maxWidth: '350px',
                }}
              >
                <div className="relative h-full w-full group">
                  <MemberCard
                    imgSource={member?.image}
                    name={member?.name}
                    position={member?.designation}
                    domain={
                      Array.isArray(member?.domain)
                        ? member.domain.join(', ')
                        : ''
                    }
                    github={member?.github}
                    linkedin={member?.linkedin}
                    instagram={member?.instagram}
                    className="relative z-10 w-full h-full transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 ease-out shadow-xl group-hover:shadow-2xl rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-textColor1/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-textColor1/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleViewMore}
          className="bg-textColor1 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all mt-12 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          VIEW MORE
        </button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-12 px-4 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)]">
      <h1 className="text-4xl md:text-5xl font-black mb-8 text-textColor1 tracking-tight">
        OUR TEAM MEMBERS
      </h1>

      {domains.length > 0 && (
        <div className="mb-12 w-full max-w-md mx-auto">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full p-3 border-2 border-textColor1 rounded-lg bg-white text-textColor1 font-bold focus:outline-none focus:ring-2 focus:ring-textColor1 focus:ring-opacity-50 transition-all shadow-md"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain?.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="w-full max-w-7xl">
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member?._id}
                imgSource={member?.image}
                name={member?.name}
                position={member?.designation}
                github={member?.github}
                linkedin={member?.linkedin}
                instagram={member?.instagram}
                className="transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg overflow-hidden w-[85%] mx-auto"
              />
            ))}
          </div>
        ) : (
          <p className="text-textColor1 text-lg py-8 bg-orange-50 rounded-lg max-w-2xl mx-auto">
            No members found for the selected domain.
          </p>
        )}
      </div>
    </div>
  )
}

export default Members
