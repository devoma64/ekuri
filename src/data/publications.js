// type: "pdf" -> previewable in the PdfPreviewModal via <iframe>
// type: "image" -> previewable as a plain image
// type: "unavailable" -> listed for the record, no file on hand yet

export const PUBLICATIONS = [
  {
    title: "Perimeter / Boundary Survey of the Ekuri Community Pristine Rainforest",
    citation: "Perimeter or Boundary Survey map of the Ekuri Community Pristine Rainforest, with the support of the Ford Foundation.",
    source: "Supported by the Ford Foundation",
    year: null,
    type: "image",
    file: "/assets/img/ekuri-perimeter-survey.jpg",
    copy: "The certified boundary survey of Old and New Ekuri Community Forest, Akamkpa Local Government Area, Cross River State — the legal basis for the 33,600-hectare community forest.",
  },
  {
    title: "Cross River State Forestry Commission Law",
    citation: "2010 Cross River State Forestry Law.",
    source: "Cross River State House of Assembly",
    year: 2010,
    type: "pdf",
    file: "/assets/docs/2010_CRS_Forestry_Commission_Law.pdf",
    copy: "Law No. 3, 2010 — establishing the State Forestry Commission and governing the management, protection, and licensing of forests and wildlife across Cross River State, including community forests like Ekuri's.",
  },
  {
    title: "A Strategy for Sustainable Development, Conservation and Management of the Forests of Cross River State",
    citation: "Forestry Department, Cross River State: A Strategy for Sustainable Development, Conservation and Management of the forests of Cross River State of Nigeria, 1994. With support from Cross River State Forestry Project (British ODA Assisted).",
    source: "Forestry Department, Cross River State — with support from the Cross River State Forestry Project (British ODA Assisted)",
    year: 1994,
    type: "unavailable",
    copy: "The state's founding forestry sector strategy, later cited as the policy foundation that enshrined community forestry as a guiding principle in Cross River State.",
  },
  {
    title: "Ekuri Initiative, Nigeria — Equator Initiative Case Study",
    citation: "UNDP (2004). UNDP Equator Initiative case studies series: Ekuri Initiative, Nigeria — Equator Initiative Prize Winner at Kuala Lumpur, Malaysia.",
    source: "UNDP Equator Initiative — Equator Prize Winner, Kuala Lumpur, Malaysia",
    year: 2004,
    type: "pdf",
    file: "/assets/docs/UNDP-2004-Ekuri-Initiative-Case-Study.pdf",
    copy: "UNDP's official case study documenting the Ekuri Initiative's history, activities, and impact — published on the occasion of the Ekuri Initiative winning the Equator Prize.",
  },
  {
    title: "Proceedings on Conservation by Communities: Community Forestry Management in Sub-Saharan Africa",
    citation: "The Ford Foundation — West Africa. 1999. Proceedings on Conservation by Communities: Community Forestry Management in sub-Saharan Africa, hosted by Ekuri at Obudu Cattle Ranch, Cross River State, Nigeria, on March 5–9, 1999. With funding from the Ford Foundation.",
    source: "The Ford Foundation — West Africa, hosted by Ekuri at Obudu Cattle Ranch, Cross River State",
    year: 1999,
    type: "unavailable",
    copy: "Proceedings from the March 5–9, 1999 conference on community forestry management, convened by the Ekuri Initiative with Ford Foundation funding and drawing participants from across Sub-Saharan Africa.",
  },
  {
    title: "Climate Solutions from Community Forests: Learning from Indigenous Peoples and Local Communities",
    citation: "United Nations Development Programme. 2016. Climate Solutions from Community Forests: Learning from Indigenous Peoples and Local Communities — the case of Ekuri, New York, NY: UNDP.",
    source: "United Nations Development Programme",
    year: 2016,
    type: "pdf",
    file: "/assets/docs/UNDP-2016-Climate-Solutions-from-Community-Forests.pdf",
    copy: "UNDP's report on community-led climate solutions, featuring the Ekuri case as a model for indigenous and local-community forest stewardship.",
  },
  {
    title: "The Power of Local Action: Lessons from 10 Years of the Equator Prize",
    citation: "UNDP. 2012. The Power of Local Action: Lessons from 10 years of the Equator Prize, New York, NY: UNDP. Page 50: Ekuri Initiative, Nigeria.",
    source: "United Nations Development Programme",
    year: 2012,
    type: "pdf",
    file: "/assets/docs/UNDP-2012-Power-of-Local-Action.pdf",
    copy: "A decade-spanning compendium of Equator Prize lessons and policy guidance — the Ekuri Initiative is profiled on page 50.",
  },
  {
    title: "Protest Letter Against the Cross River Superhighway Project",
    citation: "Ekuri Traditional Rulers Council. 2016. Protest letter against the Superhighway Project of the Cross River State Government which tacitly targeted the destruction of the Ekuri Community Forest. The International Community adopted the position of the Ekuri Traditional Rulers Council, culminating in the failure of the superhighway project.",
    source: "Ekuri Traditional Rulers Council",
    year: 2016,
    type: "pdf",
    file: "/assets/docs/Ekuri-Traditional-Rulers-Council-Protest-Letter-2016.pdf",
    copy: "The Ekuri Traditional Rulers Council's formal letter to the Governor of Cross River State opposing the Superhighway route through the Ekuri Community forest. The international community rallied behind this position, contributing to the project's failure.",
  },
  {
    title: "Map of the Proposed Cross River Superhighway Alignment",
    citation: "World Conservation Society (WCS). 2016. Map exposing the alignment of the Cross River State Government superhighway project which targeted the destruction of both Ekuri Community Pristine Rainforest and Cross River National Park. [As written in the client's plan doc — see note above on the org's actual name.]",
    // Note: the client's plan doc lists this source as "World Conservation
    // Society (WCS)" — not a real organization. The map image itself carries
    // the Wildlife Conservation Society logo, which is the correct, verifiable
    // name. Corrected here against the primary document rather than the plan
    // doc's summary, per the brief's sourcing standard.
    source: "Wildlife Conservation Society (WCS)",
    year: 2016,
    type: "image",
    file: "/assets/img/superhighway-map.jpg",
    copy: "WCS's technical map exposing how the proposed Superhighway route would have cut directly through both the Ekuri Community pristine rainforest and Cross River National Park.",
  },
  {
    title: "Letter to the President of the Federal Republic of Nigeria: The Planned Super-Highway and Cross River National Park",
    source: "WWF-UK",
    year: 2015,
    type: "pdf",
    file: "/assets/docs/WWF-Letter-to-President-Buhari-2015.pdf",
    copy: "WWF-UK's formal position letter to President Muhammadu Buhari requesting the Superhighway route be redrawn away from Cross River National Park and the Ekuri community forests.",
  },
];
