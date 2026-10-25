// Keep the archive notice on the homepage hero as Framer changes routes.
(() => {
  // Outline coordinates traced on the original photo at 1952 px wide.
  // The second contour preserves the sky between the rider's legs.
  const riderOutline = [
    [636,456],[650,447],[666,434],[682,424],[696,419],[709,420],
    [738,423],[780,427],[825,432],[864,433],[906,431],[942,430],
    [955,431],[964,437],[970,445],[973,452],[969,456],[958,462],
    [943,464],[918,460],[902,460],[903,472],[900,478],[907,487],
    [904,500],[903,516],[906,548],[902,571],[910,589],[937,594],
    [959,609],[985,600],[1005,596],[1027,597],[1045,602],[1057,606],
    [1066,599],[1079,596],[1094,599],[1106,606],[1114,617],
    [1119,632],[1119,646],[1115,660],[1107,673],[1112,680],
    [1117,687],[1130,698],[1156,720],[1178,737],[1184,741],
    [1201,750],[1212,759],[1218,775],[1223,784],[1221,790],
    [1216,788],[1211,784],[1212,792],[1208,794],[1203,787],
    [1199,784],[1200,789],[1197,790],[1191,780],[1183,773],
    [1179,756],[1175,751],[1162,744],[1142,730],[1125,715],
    [1104,703],[1094,705],[1083,701],[1071,695],[1055,695],
    [1038,699],[1014,701],[995,698],[975,702],[953,697],
    [936,688],[922,677],[902,674],[881,670],[854,670],
    [847,676],[839,681],[817,687],[813,685],[814,680],
    [800,682],[798,679],[800,674],[809,669],[811,662],
    [821,656],[832,654],[844,658],[857,654],[868,651],
    [853,650],[836,648],[822,640],[809,630],[795,613],
    [782,594],[771,574],[761,552],[753,530],[749,509],
    [746,490],[741,480],[733,484],[720,483],[714,478],
    [712,461],[690,459],[665,458],
  ];
  const legGap = [
    [789,459],[835,459],[835,476],[840,485],[843,500],[842,526],
    [845,551],[834,546],[824,534],[816,523],[807,510],
    [801,495],[796,481],[790,476],
  ];
  let noticeElement;
  let photoElement;

  function updateDepthMask() {
    if (!noticeElement?.isConnected || !photoElement?.isConnected) return;
    const photo = photoElement.getBoundingClientRect();
    const text = noticeElement.getBoundingClientRect();
    if (!photo.width || !photo.height || !text.width || !text.height) return;

    const sourceWidth = 1952;
    const sourceHeight = sourceWidth * 4320 / 6618;
    const scale = Math.max(photo.width / sourceWidth, photo.height / sourceHeight);
    const x = photo.x + (photo.width - sourceWidth * scale) / 2 - text.x;
    const y = photo.y + (photo.height - sourceHeight * scale) / 2 - text.y;
    const contour = points => points.map(([px, py], index) =>
      `${index ? "L" : "M"}${(x + px * scale).toFixed(2)} ${(y + py * scale).toFixed(2)}`
    ).join(" ") + "Z";
    const path = `M0 0H${text.width}V${text.height}H0Z ${contour(riderOutline)} ${contour(legGap)}`;
    noticeElement.style.clipPath = `path(evenodd, "${path}")`;
  }

  const resizeObserver = new ResizeObserver(updateDepthMask);

  function addReleaseNotice() {
    const isHome = location.pathname === "/" || location.pathname === "/index.html";
    const hero = isHome ? document.querySelector('[data-framer-name="Section - Hero"]') : null;

    for (const notice of document.querySelectorAll(".release-notice")) {
      if (notice.parentElement !== hero) notice.remove();
    }
    if (!hero) {
      resizeObserver.disconnect();
      return;
    }

    let notice = hero.querySelector(":scope > .release-notice");
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "release-notice";
      notice.setAttribute("role", "note");
      notice.textContent = "( NO MORE RELEASES )";
      hero.appendChild(notice);
    }
    const photo = hero.querySelector('img[alt="VITERRA"]');
    if (photo && (noticeElement !== notice || photoElement !== photo)) {
      resizeObserver.disconnect();
      photoElement?.removeEventListener("load", updateDepthMask);
      noticeElement = notice;
      photoElement = photo;
      resizeObserver.observe(hero);
      resizeObserver.observe(notice);
      resizeObserver.observe(photo);
      photo.addEventListener("load", updateDepthMask);
    }
    updateDepthMask();
  }

  addReleaseNotice();
  new MutationObserver(addReleaseNotice).observe(document.getElementById("main") || document.body, {
    childList: true,
    subtree: true,
  });
})();
