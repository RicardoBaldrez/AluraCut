// BFF(back-end for front-end)
import { SiteClient } from "datocms-client";

export default async function receiverRequests(req, res) {
  if (req.method === "POST") {
    const TOKEN = "7819493f6111b54ffd8c0115bae0df";
    const client = new SiteClient(TOKEN);

    const createRecord = await client.items.create({
      itemType: "979771", // Id da model Commnunity criado pelo Dato
			...req.body,
    });

    res.json({
      registerCreated: createRecord,
    });

		return;
  }

	res.status(404).json({
		message: 'Método GET disparado e não POST'
	});
}
