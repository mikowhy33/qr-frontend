import { NextRequest } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {

     // from headers we get the token
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    // console.log('TETETTETSTETTSTETTSTE'+token +'BZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')

    //  we get the qr
	const qr = await QRCode.toDataURL(`${token}`,{
        // much bigger size, when it comes to width
        width:1000,
        margin:1
    });

    //  we return it as a json!
	return Response.json({ qr });
}


