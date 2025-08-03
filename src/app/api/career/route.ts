import { NextRequest, NextResponse } from 'next/server';
import db from '@/utils/db';

// Save or update career form data
export async function POST(req: NextRequest) {
  const data = await req.json();
  // Upsert into a single-row table (or use user id if multi-user)
  try {
    await db`
      INSERT INTO career_form (
        id, company_name, about_content, youtube_video, industry, key_people, linked_in_link, x_link, website_link, company_stage, glassdoor_connected, ambition_box_connected, hiring_process, faqs, hiring_steps, benefits
      ) VALUES (
        1, ${data.companyName}, ${data.aboutContent}, ${data.youtubeVideo}, ${data.industry}, ${data.keyPeople}, ${data.linkedInLink}, ${data.xLink}, ${data.websiteLink}, ${data.companyStage}, ${data.glassdoorConnected}, ${data.ambitionBoxConnected}, ${data.hiringProcess}, ${data.faqs}, ${data.hiringSteps}, ${data.benefits}
      )
      ON CONFLICT (id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        about_content = EXCLUDED.about_content,
        youtube_video = EXCLUDED.youtube_video,
        industry = EXCLUDED.industry,
        key_people = EXCLUDED.key_people,
        linked_in_link = EXCLUDED.linked_in_link,
        x_link = EXCLUDED.x_link,
        website_link = EXCLUDED.website_link,
        company_stage = EXCLUDED.company_stage,
        glassdoor_connected = EXCLUDED.glassdoor_connected,
        ambition_box_connected = EXCLUDED.ambition_box_connected,
        hiring_process = EXCLUDED.hiring_process,
        faqs = EXCLUDED.faqs,
        hiring_steps = EXCLUDED.hiring_steps,
        benefits = EXCLUDED.benefits;
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving career form data:', error);
    return NextResponse.json({ error: 'Failed to save data', details: error }, { status: 500 });
  }
}

// Fetch career form data
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
    console.error('Error fetching career form data:', error);
    return NextResponse.json({ error: 'Failed to fetch data', details: error }, { status: 500 });
  }
}
