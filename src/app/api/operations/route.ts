import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0;

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('swift_operations')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        console.log('[API] Reading data from Supabase:', JSON.stringify(data));
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error('[API] Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;
        console.log(`[API] Received update request for ID: ${id}, Status: ${status}`);

        const { data, error } = await supabase
            .from('swift_operations')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) throw error;

        console.log(`[API] Updated data in Supabase:`, JSON.stringify(data));

        // Return the full list to maintain compatibility with the frontend expectation
        const { data: allData, error: fetchError } = await supabase
            .from('swift_operations')
            .select('*')
            .order('id', { ascending: true });

        if (fetchError) throw fetchError;

        return NextResponse.json(allData);
    } catch (error) {
        console.error(`[API] Error in POST handler:`, error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
