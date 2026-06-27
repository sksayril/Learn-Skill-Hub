import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    const noticeSection = await db.collection("settings").findOne({ type: "notice_section" });
    
    if (!noticeSection) {
      // Return a default inactive notice section if none exists in the DB yet
      return NextResponse.json({
        success: true,
        data: {
          title: "Upcoming Batches Announcement",
          content: "Welcome to Support Mission India. New skill development training batch admissions are starting soon.",
          active: false,
          image: ""
        }
      });
    }
    
    return NextResponse.json({ success: true, data: noticeSection });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, active, image } = body;
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    await db.collection("settings").updateOne(
      { type: "notice_section" },
      { 
        $set: { 
          title: title || "Upcoming Batches Announcement",
          content: content || "",
          active: active === true || active === "true",
          image: image || "",
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
