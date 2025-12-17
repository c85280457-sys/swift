
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/operations.json');

function readData() {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
}

function writeData(data: any) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
    const data = readData();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { id, status } = body;

    const data = readData();
    const updatedData = data.map((op: any) =>
        op.id === id ? { ...op, status } : op
    );

    writeData(updatedData);
    return NextResponse.json(updatedData);
}
