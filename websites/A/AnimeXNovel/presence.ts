const presence = new Presence({
		clientId: "700596580218175548"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	titulo = document.title,
	pesquisaR = titulo.slice(77),
	tituloLength = titulo.length - 3,
	obraR = titulo.slice(0, tituloLength),
	capituloR = titulo.slice(tituloLength),
	obraanimeR = titulo.slice(7).slice(0, titulo.length - 18),
	listaR = titulo.slice(54),
	capitulo =
		document
			.querySelector("h2.post-title.entry-title")
			.textContent.match(/\d+/g) || null,
	obra = document.querySelector("h2.post-title.entry-title").textContent,
	noticia = document.querySelector("h2.post-title.entry-title").textContent;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "axn-logo"
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.pathname.includes("anime")) {
		presenceData.details = obraanimeR;
		presenceData.state = `Episódio ${capituloR}`;
	} else if (document.location.pathname.startsWith("/search")) {
		if (document.location.pathname.includes("/search/label/")) {
			if (document.location.pathname.includes("/In%C3%ADcio"))
				presenceData.details = "Página inícial";
			else {
				presenceData.details = "Vendo a lista de";
				presenceData.state = listaR;
			}
		} else {
			presenceData.details = "Pesquisando...";
			presenceData.state = pesquisaR;
		}
	} else if (document.location.pathname.match("/")) {
		if (
			capitulo === null &&
			document.querySelector("div.post-body.entry-content.cl div.ocultar") !==
				null
		) {
			presenceData.details = "Vendo página de obra";
			presenceData.state = obra;
		} else if (
			document.querySelector("div.post-body.entry-content.cl div.ocultar") ===
			null
		) {
			presenceData.details = "Vendo página";
			presenceData.state = noticia;
		} else {
			presenceData.details = obraR;
			presenceData.state = `Capítulo ${capituloR}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
