import { connectDB } from '@/lib/db';
import { Note } from '@/lib/models/Note';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const note = await Note.findById(id);
    if (!note) {
      return Response.json({ error: 'Note not found' }, { status: 404 });
    }

    return Response.json(note);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { title, content } = await req.json();

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    if (!title || !content) {
      return Response.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!note) {
      return Response.json({ error: 'Note not found' }, { status: 404 });
    }

    return Response.json(note);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return Response.json({ error: 'Note not found' }, { status: 404 });
    }

    return Response.json({ message: 'Note deleted' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
