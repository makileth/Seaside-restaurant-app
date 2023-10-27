import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

// Define a function to handle a PUT request
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } } // we expect to receive an object with a property params, and within that params property, there should be another property id
) => {
  // Extract the 'id' from the 'params' object
  const { id } = params;

  try {
    // Parse the JSON data from the request body
    const body = await req.json();

    await prisma.order.update({
      // condition for the record to be updated
      where: { id: id },
      // we update the 'status' property
      data: { status: body },
    });

    return new NextResponse(JSON.stringify("Order updated successfully"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify("An error occurred: " + error), {
      status: 500,
    });
  }
};

