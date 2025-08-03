import { NextResponse } from 'next/server';
import db from '@/utils/db';

// Public GET: anyone can view career form data
export async function GET() {
  try {
    const rows = await db`SELECT * FROM career_form WHERE id = 1`;
    if (!rows[0]) return NextResponse.json({});
    const row = rows[0];
    return NextResponse.json({
      companyName: row.company_name,
      aboutContent: row.about_content,
      youtubeVideo: row.youtube_video,
      industry: row.industry,
      keyPeople: row.key_people,
      linkedInLink: row.linked_in_link,
      xLink: row.x_link,
      websiteLink: row.website_link,
      companyStage: row.company_stage,
      glassdoorConnected: row.glassdoor_connected,
      ambitionBoxConnected: row.ambition_box_connected,
      hiringProcess: row.hiring_process,
      faqs: row.faqs,
      hiringSteps: row.hiring_steps,
      benefits: row.benefits
    });
  } catch (error) {
    console.error('Error fetching public career form data:', error);
    return NextResponse.json({ error: 'Failed to fetch data', details: error }, { status: 500 });
  }
}
