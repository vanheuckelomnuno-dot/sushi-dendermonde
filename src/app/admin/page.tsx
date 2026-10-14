'use client'

import { useState, useEffect, useCallback } from 'react'
import { format, isToday, parseISO } from 'date-fns'
import { nl } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Calendar, Users, Clock, RefreshCw, CheckCircle2, ChefHat, Bell, LogOut, Trash2 } from 'lucide-react'
import { formatEuro } from '@/lib/utils'
import { cn } from '@/lib/utils'

type OrderStatus = 'nieuw' | 'in_behandeling' | 'klaar'
type ReservStatus = 'bevestigd' | 'aanwezig' | 'afgerond'

interface AdminOrder {
  id: string
  tijdstip: string
  klant: string
  telefoon: string
  email: string
  type: 'afhalen' | 'levering'
  adres: string
  items: { naam: string; aantal: number; prijs: number }[]
  totaal: number
  opmerking: string
  status: OrderStatus
}

interface AdminReservatie {
  id: string
  naam: string
  telefoon: string
  email: string
  datum: string
  tijdstip: string
  personen: number
  opmerking: string
  status: ReservStatus
  tijdStempel: string
  tafel?: number
}

const TAFELS = [
  { id: 1, plaatsen: 4, label: 'Tafel 1' },
  { id: 2, plaatsen: 4, label: 'Tafel 2' },
  { id: 3, plaatsen: 4, label: 'Tafel 3' },
  { id: 4, plaatsen: 2, label: 'Tafel 4' },
  { id: 5, plaatsen: 2, label: 'Tafel 5' },
  { id: 6, plaatsen: 2, label: 'Tafel 6' },
]

const STATUS_ORDER: Record<OrderStatus, { label: string; kleur: string; volgende?: OrderStatus }> = {
  nieuw:          { label: 'Nieuw', kleur: 'bg-amber-100 text-amber-700 border-amber-200', volgende: 'in_behandeling' },
  in_behandeling: { label: 'In behandeling', kleur: 'bg-blue-100 text-blue-700 border-blue-200', volgende: 'klaar' },
  klaar:          { label: 'Klaar', kleur: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}

const STATUS_RESERV: Record<ReservStatus, { label: string; kleur: string; volgende?: ReservStatus }> = {
  bevestigd: { label: 'Bevestigd', kleur: 'bg-blue-100 text-blue-700 border-blue-200', volgende: 'aanwezig' },
  aanwezig:  { label: 'Aanwezig', kleur: 'bg-emerald-100 text-emerald-700 border-emerald-200', volgende: 'afgerond' },
  afgerond:  { label: 'Afgerond', kleur: 'bg-gray-100 text-gray-500 border-gray-200' },
}

export default function AdminPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [reservaties, setReservaties] = useState<AdminReservatie[]>([])
  const [actieveTab, setActieveTab] = useState<'orders' | 'reservaties' | 'tafels'>('orders')
  const [aantalNieuw, setAantalNieuw] = useState(0)
  const [laatstGeladen, setLaatstGeladen] = useState<Date | null>(null)
  const [toegang, setToegang] = useState(true)

  const laadData = useCallback(() => {
    try {
      const o: AdminOrder[] = JSON.parse(localStorage.getItem('sushi-admin-orders') || '[]')
      const r: AdminReservatie[] = JSON.parse(localStorage.getItem('sushi-admin-reservaties') || '[]')
      setOrders(o)
      setReservaties(r)
      setAantalNieuw(o.filter((x) => x.status === 'nieuw').length)
      setLaatstGeladen(new Date())
    } catch {}
  }, [])

  useEffect(() => {
    laadData()
    const interval = setInterval(laadData, 5000)
    return () => clearInterval(interval)
  }, [laadData])

  function updateOrderStatus(id: string, status: OrderStatus) {
    const bijgewerkt = orders.map((o) => o.id === id ? { ...o, status } : o)
    setOrders(bijgewerkt)
    localStorage.setItem('sushi-admin-orders', JSON.stringify(bijgewerkt))
  }

  function updateReservStatus(id: string, status: ReservStatus) {
    const bijgewerkt = reservaties.map((r) => r.id === id ? { ...r, status } : r)
    setReservaties(bijgewerkt)
    localStorage.setItem('sushi-admin-reservaties', JSON.stringify(bijgewerkt))
  }

  function verwijderOrder(id: string) {
    const bijgewerkt = orders.filter((o) => o.id !== id)
    setOrders(bijgewerkt)
    setAantalNieuw(bijgewerkt.filter((x) => x.status === 'nieuw').length)
    localStorage.setItem('sushi-admin-orders', JSON.stringify(bijgewerkt))
  }

  function verwijderReservatie(id: string) {
    const bijgewerkt = reservaties.filter((r) => r.id !== id)
    setReservaties(bijgewerkt)
    localStorage.setItem('sushi-admin-reservaties', JSON.stringify(bijgewerkt))
  }

  function allesWissen(type: 'orders' | 'reservaties') {
    if (type === 'orders') {
      setOrders([])
      setAantalNieuw(0)
      localStorage.setItem('sushi-admin-orders', '[]')
    } else {
      setReservaties([])
      localStorage.setItem('sushi-admin-reservaties', '[]')
    }
  }

  function weisTafelToe(reservatieId: string, tafelId: number) {
    const bijgewerkt = reservaties.map((r) =>
      r.id === reservatieId ? { ...r, tafel: r.tafel === tafelId ? undefined : tafelId } : r
    )
    setReservaties(bijgewerkt)
    localStorage.setItem('sushi-admin-reservaties', JSON.stringify(bijgewerkt))
  }

  const vandaagReservaties = reservaties.filter((r) => {
    try { return isToday(parseISO(r.datum)) } catch { return false }
  })

  const bezetteTafels = new Set(vandaagReservaties.filter((r) => r.tafel && r.status !== 'afgerond').map((r) => r.tafel))


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-accent" />
          <div>
            <h1 className="font-semibold text-base">Sushi Dendermonde — Admin</h1>
            <p className="text-white/50 text-xs">Live overzicht · elke 5s ververst</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {laatstGeladen && (
            <span className="text-white/40 text-xs">{format(laatstGeladen, 'HH:mm:ss')}</span>
          )}
          <button onClick={laadData} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Verversen">
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' })
              router.push('/admin/login')
            }}
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/30 transition-colors"
            title="Uitloggen"
          >
            <LogOut className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-0">
          {([
            { id: 'orders', label: 'Bestellingen', icon: ShoppingBag, badge: aantalNieuw },
            { id: 'reservaties', label: 'Reservaties', icon: Calendar, badge: vandaagReservaties.length },
            { id: 'tafels', label: 'Tafels', icon: Users, badge: 0 },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActieveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors',
                actieveTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge > 0 && (
                <span className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  tab.id === 'orders' && aantalNieuw > 0 ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* BESTELLINGEN TAB */}
        {actieveTab === 'orders' && (
          <div>
            {orders.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => { if (confirm('Alle bestellingen verwijderen?')) allesWissen('orders') }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Alles wissen
                </button>
              </div>
            )}
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nog geen bestellingen</p>
                <p className="text-xs mt-1">Bestellingen verschijnen hier zodra ze worden geplaatst</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const s = STATUS_ORDER[order.status]
                  const tijd = format(parseISO(order.tijdstip), 'HH:mm', { locale: nl })
                  const datum = format(parseISO(order.tijdstip), 'dd MMM', { locale: nl })
                  return (
                    <div key={order.id} className={cn(
                      'bg-white rounded-xl border-2 p-5',
                      order.status === 'nieuw' ? 'border-amber-200' : order.status === 'in_behandeling' ? 'border-blue-200' : 'border-gray-100'
                    )}>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {order.status === 'nieuw' && <Bell className="w-4 h-4 text-amber-500 animate-pulse" />}
                            <span className="font-semibold text-charcoal">{order.klant}</span>
                            <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', s.kleur)}>
                              {s.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{order.id} · {datum} om {tijd}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.telefoon} · {order.type === 'levering' ? `Levering: ${order.adres}` : 'Afhalen'}
                          </p>
                          {order.opmerking && <p className="text-xs text-gray-400 mt-1 italic">"{order.opmerking}"</p>}
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-2">
                          <p className="font-bold text-lg text-charcoal">{formatEuro(order.totaal)}</p>
                          <p className="text-xs text-gray-400">{order.items.reduce((a, i) => a + i.aantal, 0)} items</p>
                          <button
                            onClick={() => verwijderOrder(order.id)}
                            className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Verwijderen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.aantal}× {item.naam}</span>
                            <span className="text-gray-500">{formatEuro(item.prijs * item.aantal)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actie knop */}
                      {s.volgende && (
                        <button
                          onClick={() => updateOrderStatus(order.id, s.volgende!)}
                          className={cn(
                            'w-full py-2.5 rounded-lg text-sm font-semibold transition-colors',
                            order.status === 'nieuw'
                              ? 'bg-amber-500 hover:bg-amber-600 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          )}
                        >
                          {order.status === 'nieuw' ? '→ In behandeling nemen' : '→ Markeer als klaar'}
                        </button>
                      )}
                      {order.status === 'klaar' && (
                        <div className="flex items-center justify-center gap-2 py-2 text-emerald-600 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Klaar voor {order.type === 'levering' ? 'levering' : 'afhaling'}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* RESERVATIES TAB */}
        {actieveTab === 'reservaties' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              {vandaagReservaties.length > 0 ? (
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl flex-1 mr-4">
                  <p className="text-sm font-semibold text-accent">{vandaagReservaties.length} reservatie{vandaagReservaties.length !== 1 ? 's' : ''} vandaag</p>
                </div>
              ) : <div />}
              {reservaties.length > 0 && (
                <button
                  onClick={() => { if (confirm('Alle reservaties verwijderen?')) allesWissen('reservaties') }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Alles wissen
                </button>
              )}
            </div>
            {reservaties.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nog geen reservaties</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reservaties.map((res) => {
                  const s = STATUS_RESERV[res.status]
                  const datumStr = res.datum ? format(parseISO(res.datum), 'EEEE dd MMMM', { locale: nl }) : '—'
                  const vandaag = res.datum ? isToday(parseISO(res.datum)) : false
                  return (
                    <div key={res.id} className={cn(
                      'bg-white rounded-xl border-2 p-5',
                      vandaag && res.status !== 'afgerond' ? 'border-accent/40' : 'border-gray-100'
                    )}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-charcoal">{res.naam}</span>
                            {vandaag && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full font-bold">VANDAAG</span>}
                            <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', s.kleur)}>
                              {s.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{datumStr}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{res.tijdstip}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{res.personen} personen</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{res.id} · {res.telefoon}</p>
                          {res.opmerking && <p className="text-xs text-gray-400 mt-1 italic">"{res.opmerking}"</p>}
                        </div>
                        <div className="shrink-0 text-right flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">Tafel</p>
                            <button
                              onClick={() => verwijderReservatie(res.id)}
                              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Reservatie verwijderen"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {TAFELS.filter((t) => t.plaatsen >= res.personen || res.personen <= 4).map((t) => (
                              <button
                                key={t.id}
                                onClick={() => weisTafelToe(res.id, t.id)}
                                className={cn(
                                  'text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors',
                                  res.tafel === t.id
                                    ? 'bg-charcoal text-white border-charcoal'
                                    : bezetteTafels.has(t.id) && res.tafel !== t.id
                                    ? 'bg-red-50 text-red-400 border-red-200'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-charcoal'
                                )}
                              >
                                T{t.id} ({t.plaatsen}p)
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {s.volgende && (
                        <button
                          onClick={() => updateReservStatus(res.id, s.volgende!)}
                          className="w-full py-2 rounded-lg text-sm font-semibold bg-charcoal text-white hover:bg-charcoal/90 transition-colors mt-2"
                        >
                          → {res.status === 'bevestigd' ? 'Gasten aanwezig' : 'Afgerond'}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAFELS TAB */}
        {actieveTab === 'tafels' && (
          <div>
            <p className="text-sm text-gray-500 mb-6">Restaurantplattegrond · {format(new Date(), 'EEEE dd MMMM', { locale: nl })}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {TAFELS.map((tafel) => {
                const reservatie = vandaagReservaties.find((r) => r.tafel === tafel.id && r.status !== 'afgerond')
                const bezet = !!reservatie
                return (
                  <div key={tafel.id} className={cn(
                    'rounded-2xl border-2 p-5 text-center transition-colors',
                    bezet ? 'border-accent/40 bg-accent/5' : 'border-gray-100 bg-white'
                  )}>
                    <div className={cn(
                      'w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center',
                      bezet ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400'
                    )}>
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-charcoal text-sm">{tafel.label}</p>
                    <p className="text-xs text-gray-400 mb-2">{tafel.plaatsen} personen</p>
                    {bezet && reservatie ? (
                      <div>
                        <p className="text-xs font-semibold text-accent">{reservatie.naam}</p>
                        <p className="text-xs text-gray-500">{reservatie.tijdstip} · {reservatie.personen}p</p>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block', STATUS_RESERV[reservatie.status].kleur)}>
                          {STATUS_RESERV[reservatie.status].label}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">Vrij</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legenda */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-sm font-semibold text-charcoal mb-3">Restaurantcapaciteit</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tafels van 4 (T1, T2, T3)</span>
                  <span className="font-semibold">3 × 4 = 12p</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tafels van 2 (T4, T5, T6)</span>
                  <span className="font-semibold">3 × 2 = 6p</span>
                </div>
                <div className="flex justify-between font-semibold text-charcoal col-span-2 pt-2 border-t border-gray-100">
                  <span>Totale capaciteit</span>
                  <span>18 personen</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
