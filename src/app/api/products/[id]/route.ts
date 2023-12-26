import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "../../auth/[...nextauth]/route"; 
// Define a function to handle a PUT request
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } } // we expect to receive an object with a property params, and within that params property, there should be another property id
) => {
  // Extract the 'id' from the 'params' object
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify("An error occurred: " + error), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {

  const { id } = params;

  const session = await getAuthSession();

  console.log('The Session is:' + session)

  console.log('The ID is:' + id)

  if (session?.user.isAdmin) {

    try {

      console.log('The Session is:' + session)

      console.log('The ID is:' + id)

      const product = await prisma.product.delete({
        where: { id: id },
      });

      return new NextResponse(
        JSON.stringify(
          "The following product was successfully deleted:" + product
        ),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);

      return new NextResponse(JSON.stringify("An error occurred: " + error), {
        status: 500,
      });
    }
  }
  return new NextResponse(JSON.stringify("You are not an admin!"), {
    status: 403,
  });
  

};
