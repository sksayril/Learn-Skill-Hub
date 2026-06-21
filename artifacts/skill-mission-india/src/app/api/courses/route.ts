import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const defaultCourses = [
  {
    title: "Office Automation & Accounting",
    subtitle: "NIELIT Certified Program",
    category: "NIELIT",
    image: "/images/program_office.png",
    gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
    accent: "#00C2FF",
    benefits: ["MS Office & Tally ERP", "DTP & Design Tools", "Govt. Certification"],
    duration: "6 Months",
    seats: "240 Seats Available",
    mode: "Classroom + Lab",
    eligibility: "10th Pass & Above",
    syllabus: ["MS Office Suite", "Tally ERP", "DTP & Design", "Accounting Basics"],
    certification: "NIELIT 'O' Level Certificate",
    description: "Comprehensive NIELIT-certified program covering office automation tools, accounting software, and desktop publishing for administrative careers.",
    updatedAt: new Date()
  },
  {
    title: "UNICEF E-Placement",
    subtitle: "Pan-India Digital Employment",
    category: "UNICEF",
    image: "/images/program_unicef.png",
    gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
    accent: "#00E5A8",
    benefits: ["Digital Employment Platform", "Pan-India Placement", "Industry Mentorship"],
    duration: "3 Months",
    seats: "180 Seats Available",
    mode: "Online + Placement",
    eligibility: "12th Pass, Age 18–35",
    syllabus: ["Digital Literacy", "Soft Skills", "Interview Prep", "Job Portal Training"],
    certification: "UNICEF E-Placement Certificate",
    description: "International UNICEF-backed e-placement program connecting trained youth with global digital employment opportunities.",
    updatedAt: new Date()
  },
  {
    title: "PM VIKAS",
    subtitle: "PM Vishwakarma Scheme",
    category: "Government",
    image: "/images/program_pmvikas.png",
    gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
    accent: "#F59E0B",
    benefits: ["Artisan & Craftsman Training", "Financial Assistance", "Tool Kit Support"],
    duration: "6 Months",
    seats: "320 Seats Available",
    mode: "On-site Training",
    eligibility: "Artisans & Craftsmen",
    syllabus: ["Trade Skills", "Financial Literacy", "Marketing", "Tool Kit Usage"],
    certification: "PM Vishwakarma Certificate",
    description: "PM Vishwakarma Kaushal Samman – empowering traditional artisans and craftspeople with modern skills and market access.",
    updatedAt: new Date()
  },
  {
    title: "MSME Skill Development",
    subtitle: "Ministry of MSME",
    category: "MSME",
    image: "/images/program_msme.png",
    gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent",
    accent: "#00E5A8",
    benefits: ["Manufacturing & MSME Focus", "Entrepreneurship Support", "Bank Loan Linkage"],
    duration: "4 Months",
    seats: "150 Seats Available",
    mode: "Classroom + Industry Visit",
    eligibility: "8th Pass & Above",
    syllabus: ["Manufacturing Basics", "Quality Control", "Entrepreneurship", "Bank Linkage"],
    certification: "MSME Skill Certificate",
    description: "MSME Ministry-backed skill development programs for manufacturing, service sector, and entrepreneurship development.",
    updatedAt: new Date()
  },
  {
    title: "CSR Skill Programs",
    subtitle: "IBM · Infosys · Tech Mahindra",
    category: "Corporate CSR",
    image: "/images/program_csr.png",
    gradient: "from-purple-900/90 via-purple-800/70 to-transparent",
    accent: "#A78BFA",
    benefits: ["Industry-Funded Training", "Placement Guarantee", "Stipend During Training"],
    duration: "3–6 Months",
    seats: "200 Seats Available",
    mode: "Hybrid",
    eligibility: "Graduate / Diploma Holders",
    syllabus: ["IT Fundamentals", "Coding Basics", "Communication", "Corporate Readiness"],
    certification: "Industry Partner Certificate",
    description: "Industry-funded CSR programs by Infosys, IBM, and Tech Mahindra providing tech skills and direct placement pathways.",
    updatedAt: new Date()
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    let courses = await db
      .collection("courses")
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    // If empty, auto-seed the default courses
    if (courses.length === 0) {
      await db.collection("courses").insertMany(defaultCourses);
      courses = await db
        .collection("courses")
        .find({})
        .sort({ updatedAt: -1 })
        .toArray();
    }
    
    return NextResponse.json({ success: true, data: courses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    const newCourse = {
      ...body,
      benefits: Array.isArray(body.benefits) ? body.benefits : (body.benefits || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      syllabus: Array.isArray(body.syllabus) ? body.syllabus : (body.syllabus || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("courses").insertOne(newCourse);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing course id" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    const normalizedUpdate = {
      ...updateFields,
      benefits: Array.isArray(updateFields.benefits) ? updateFields.benefits : (updateFields.benefits || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      syllabus: Array.isArray(updateFields.syllabus) ? updateFields.syllabus : (updateFields.syllabus || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { $set: normalizedUpdate }
    );
    
    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    await db.collection("courses").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
