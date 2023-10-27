import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url); //  represents the query parameters in the URL.

  const category = searchParams.get("category"); // It tries to get the value of the "category" query parameter

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { catSlug: category } : { isFeatured: true }),
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Oops! Something went wrong!", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const products = await prisma.product.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(products), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({message: 'Something went wrong!'}), { status: 500 });
    
  }
};
