import { Card, CardTitle } from '@/components/ui/card'

type ModuleOverviewProps = {
  title: string
  description: string
  metrics: Array<{ label: string; value: string; tone?: string }>
  actions: string[]
}

export function ModuleOverview({ title, description, metrics, actions }: ModuleOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-sky-700">Operación</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink-900">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardTitle>{metric.label}</CardTitle>
            <p className={`mt-2 text-2xl font-semibold ${metric.tone ?? 'text-ink-900'}`}>{metric.value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <CardTitle>Acciones rápidas</CardTitle>
        <div className="mt-4 flex flex-wrap gap-3">
          {actions.map((action) => (
            <button key={action} type="button" className="rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-800">
              {action}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}