export type EventItem = {
id: string;
slug: string;
title: string;
date: string; // ISO
city: string;
price?: string;
image?: string;
venue?: string;
tags?: string[];
};


export const MOCK_EVENTS: EventItem[] = [
{ id:'1', slug:'street-fest-calgary', title:'15th Ave Street Fest', date:new Date(Date.now()+86400000).toISOString(), city:'Calgary', price:'Free', image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', venue:'Mission District', tags:['outdoor','family'] },
{ id:'2', slug:'indie-night-yyc', title:'Indie Night YYC', date:new Date(Date.now()+172800000).toISOString(), city:'Calgary', price:'$15', image:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', venue:'The Palomino', tags:['music','18+'] },
{ id:'3', slug:'tech-meetup-sept', title:'Tech Meetup — September', date:new Date(Date.now()+259200000).toISOString(), city:'Calgary', price:'Free', image:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f', venue:'Platform Calgary', tags:['tech','networking'] },
];