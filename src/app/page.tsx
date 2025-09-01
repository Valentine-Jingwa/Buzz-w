import EventCard from '@/components/EventCard';
import { MOCK_EVENTS } from '@/lib/mock';


export default function Page() {
return (
<div className="grid gap-4">
<h1 className="text-2xl font-bold">Discover</h1>
<div className="grid gap-4 md:grid-cols-2">
{MOCK_EVENTS.map(e => <EventCard key={e.id} e={e} />)}
</div>
</div>
);
}