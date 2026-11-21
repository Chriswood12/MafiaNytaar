(() => {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════════
  //  1. INTRO & MESSENGER IN-APP BANNER
  // ══════════════════════════════════════════════════════════════════════════
  const introEl = document.getElementById('intro-screen');
  const reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let introDismissed = false;

  function dismissIntro() {
    if (introDismissed) return;
    introDismissed = true;
    document.body.classList.add('intro-done');

    if (!introEl) return;
    if (reducedMotion) {
      introEl.style.display = 'none';
      return;
    }

    introEl.style.animation = 'none';
    introEl.classList.add('is-leaving');
    window.setTimeout(() => {
      introEl.style.display = 'none';
    }, 340);
  }

  if (introEl) {
    if (reducedMotion) {
      dismissIntro();
    } else {
      introEl.addEventListener('click', dismissIntro);
      window.setTimeout(dismissIntro, 1750);
    }
  } else {
    document.body.classList.add('intro-done');
  }

  (function initMessengerBanner() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    const isInApp = /FBAN|FBAV|FB_IAB|Messenger|Instagram/i.test(ua);
    const banner = document.getElementById('messenger-banner');
    const closeBtn = document.getElementById('messenger-banner-close');

    if (isInApp && banner) {
      banner.style.display = 'block';
    }
    if (closeBtn && banner) {
      closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
      });
    }
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  2. OFFSCREEN ANIMATION PAUSER & ONE-SHOT SCROLL REVEAL
  // ══════════════════════════════════════════════════════════════════════════
  (function initObservers() {
    const animatedEls = document.querySelectorAll('.paper-drips, .top-seal, .wax-seal');
    const revealEls = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window) || reducedMotion) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('anim-paused', !entry.isIntersecting);
        });
      },
      { threshold: 0.01 }
    );
    animatedEls.forEach((el) => animObserver.observe(el));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -30px 0px', threshold: 0.02 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  3. INTERAKTIVT SLÆGTSTRÆ (FAMIGLIA DI LEGNO)
  // ══════════════════════════════════════════════════════════════════════════
  function initFamilyTree() {
    const data = window.FAMILY_TREE_DATA;
    if (!data || !Array.isArray(data.people) || !Array.isArray(data.relations)) return;

    const subtitleEl = document.getElementById('treeSubtitle');
    const draftBadgeEl = document.getElementById('treeDraftBadge');
    const viewportEl = document.getElementById('treeViewport');
    const canvasEl = document.getElementById('treeCanvas');
    const svgEl = document.getElementById('treeLines');
    const generationsEl = document.getElementById('treeGenerations');
    const listViewEl = document.getElementById('treeListView');
    const detailEl = document.getElementById('treeDetail');
    const viewTreeBtn = document.getElementById('viewTreeBtn');
    const viewListBtn = document.getElementById('viewListBtn');

    if (!viewportEl || !canvasEl || !svgEl || !generationsEl || !listViewEl || !detailEl) return;

    if (subtitleEl && data.subtitle) {
      subtitleEl.textContent = data.subtitle;
    }
    if (draftBadgeEl) {
      draftBadgeEl.style.display = data.isPlaceholder ? 'inline-block' : 'none';
    }

    // Lookup maps
    const peopleById = new Map();
    const adjRelations = new Map();

    data.people.forEach((person) => {
      peopleById.set(person.id, person);
      adjRelations.set(person.id, []);
    });

    function addAdj(sourceId, targetId, type, typeLabel, contextLabel) {
      if (!adjRelations.has(sourceId) || !peopleById.has(targetId)) return;
      const list = adjRelations.get(sourceId);
      const exists = list.some(
        (item) => item.targetId === targetId && item.type === type && item.typeLabel === typeLabel
      );
      if (!exists) {
        list.push({ targetId, type, typeLabel, contextLabel });
      }
    }

    data.relations.forEach((rel) => {
      const fromIds = Array.isArray(rel.from) ? rel.from : [rel.from];
      const toId = rel.to;

      if (rel.type === 'marriage') {
        fromIds.forEach((fid) => {
          addAdj(fid, toId, 'marriage', 'Ægtefælle', rel.label || 'Ægtefæller');
          addAdj(toId, fid, 'marriage', 'Ægtefælle', rel.label || 'Ægtefæller');
        });
      } else if (rel.type === 'parent') {
        fromIds.forEach((fid) => {
          addAdj(fid, toId, 'parent', 'Barn', rel.label || 'Barn');
          addAdj(toId, fid, 'parent', 'Forælder', rel.label || 'Forælder');
        });
      } else if (rel.type === 'sibling') {
        fromIds.forEach((fid) => {
          addAdj(fid, toId, 'sibling', rel.label || 'Søskende', rel.label || 'Søskende');
          addAdj(toId, fid, 'sibling', rel.label || 'Søskende', rel.label || 'Søskende');
        });
      }
    });

    let selectedId = null;
    let currentView = 'tree';
    let rafPending = false;

    function createMemberNode(person) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tree-node' + (person.status === 'deceased' ? ' is-deceased' : '');
      btn.dataset.id = person.id;
      btn.setAttribute(
        'aria-label',
        `${person.mafiaName} (${person.realName}) — ${person.title}`
      );

      const crest = document.createElement('div');
      crest.className = 'node-crest';
      crest.textContent = person.monogram || 'DL';

      if (person.status === 'deceased') {
        const mark = document.createElement('span');
        mark.className = 'node-deceased-mark';
        mark.textContent = '†';
        mark.setAttribute('aria-hidden', 'true');
        crest.appendChild(mark);
      }

      const mafiaEl = document.createElement('div');
      mafiaEl.className = 'node-mafia-name';
      mafiaEl.textContent = person.mafiaName;

      const realEl = document.createElement('div');
      realEl.className = 'node-real-name';
      realEl.textContent = person.realName;

      const titleEl = document.createElement('div');
      titleEl.className = 'node-title';
      titleEl.textContent = person.title;

      btn.append(crest, mafiaEl, realEl, titleEl);
      btn.addEventListener('click', () => selectMember(person.id, false));
      return btn;
    }

    function renderTreeView() {
      generationsEl.innerHTML = '';

      const byGen = new Map();
      data.people.forEach((person) => {
        const gen = Number(person.generation) || 1;
        if (!byGen.has(gen)) byGen.set(gen, []);
        byGen.get(gen).push(person);
      });

      const sortedGens = Array.from(byGen.keys()).sort((a, b) => a - b);
      const topGen = sortedGens[0] || 1;
      const topPeople = byGen.get(topGen) || [];
      const placed = new Set();

      // Build marriage partner lookup for same-generation pairing
      const marriagePairs = [];
      data.relations.forEach((rel) => {
        if (rel.type === 'marriage' && typeof rel.from === 'string' && typeof rel.to === 'string') {
          marriagePairs.push([rel.from, rel.to]);
        }
      });

      // Helper to collect children of a given list of parent IDs
      function getChildrenOf(parentIds) {
        const childIds = [];
        data.relations.forEach((rel) => {
          if (rel.type !== 'parent') return;
          const fromList = Array.isArray(rel.from) ? rel.from : [rel.from];
          if (fromList.some((fid) => parentIds.includes(fid)) && !childIds.includes(rel.to)) {
            if (peopleById.has(rel.to)) childIds.push(rel.to);
          }
        });
        return childIds.map((id) => peopleById.get(id));
      }

      const placedChildren = new Set();

      topPeople.forEach((person) => {
        if (placed.has(person.id)) return;

        const branchEl = document.createElement('div');
        branchEl.className = 'tree-branch';

        const parentsWrap = document.createElement('div');
        parentsWrap.className = 'tree-branch-parents';

        const marriage = marriagePairs.find(
          ([a, b]) =>
            (a === person.id && topPeople.some((p) => p.id === b && !placed.has(b))) ||
            (b === person.id && topPeople.some((p) => p.id === a && !placed.has(a)))
        );

        let unitIds;
        if (marriage) {
          const partnerId = marriage[0] === person.id ? marriage[1] : marriage[0];
          const partner = peopleById.get(partnerId);
          placed.add(person.id);
          placed.add(partner.id);
          unitIds = [person.id, partner.id];

          const coupleEl = document.createElement('div');
          coupleEl.className = 'couple-unit';

          const tieEl = document.createElement('div');
          tieEl.className = 'marriage-tie';
          tieEl.setAttribute('aria-hidden', 'true');
          const tieBadge = document.createElement('span');
          tieBadge.textContent = '❦';
          tieEl.appendChild(tieBadge);

          coupleEl.append(createMemberNode(person), tieEl, createMemberNode(partner));
          parentsWrap.appendChild(coupleEl);
        } else {
          placed.add(person.id);
          unitIds = [person.id];

          const singleEl = document.createElement('div');
          singleEl.className = 'single-unit';
          singleEl.appendChild(createMemberNode(person));
          parentsWrap.appendChild(singleEl);
        }

        branchEl.appendChild(parentsWrap);

        const children = getChildrenOf(unitIds).filter((c) => !placedChildren.has(c.id));
        if (children.length > 0) {
          const childrenWrap = document.createElement('div');
          childrenWrap.className = 'tree-branch-children';
          children.forEach((child) => {
            placedChildren.add(child.id);
            childrenWrap.appendChild(createMemberNode(child));
          });
          branchEl.appendChild(childrenWrap);
        }

        generationsEl.appendChild(branchEl);
      });
    }

    function renderListView() {
      listViewEl.innerHTML = '';

      const byGen = new Map();
      data.people.forEach((person) => {
        const gen = Number(person.generation) || 1;
        if (!byGen.has(gen)) byGen.set(gen, []);
        byGen.get(gen).push(person);
      });

      const sortedGens = Array.from(byGen.keys()).sort((a, b) => a - b);

      sortedGens.forEach((gen) => {
        const block = document.createElement('div');
        block.className = 'list-gen-block';

        const heading = document.createElement('div');
        heading.className = 'list-gen-title';
        heading.textContent = `${gen}. Generation`;

        const grid = document.createElement('div');
        grid.className = 'list-gen-grid';

        byGen.get(gen).forEach((person) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'list-member-btn' + (person.status === 'deceased' ? ' is-deceased' : '');
          btn.dataset.id = person.id;

          const crest = document.createElement('div');
          crest.className = 'node-crest';
          crest.style.marginBottom = '0';
          crest.style.flexShrink = '0';
          crest.textContent = person.monogram || 'DL';
          if (person.status === 'deceased') {
            const mark = document.createElement('span');
            mark.className = 'node-deceased-mark';
            mark.textContent = '†';
            crest.appendChild(mark);
          }

          const info = document.createElement('div');
          info.className = 'list-member-info';

          const name = document.createElement('div');
          name.className = 'list-member-name';
          name.textContent = person.mafiaName;

          const sub = document.createElement('div');
          sub.className = 'list-member-sub';
          sub.textContent = `${person.realName} · ${person.title}`;

          const rel = document.createElement('div');
          rel.className = 'list-member-rel';
          rel.textContent = person.relationSummary || '';

          info.append(name, sub, rel);
          btn.append(crest, info);
          btn.addEventListener('click', () => selectMember(person.id, false));
          grid.appendChild(btn);
        });

        block.append(heading, grid);
        listViewEl.appendChild(block);
      });
    }

    function createSvgPath(d, className, endpoints) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', className);
      path.dataset.endpoints = endpoints.join(',');
      return path;
    }

    function drawTreeLines() {
      if (currentView !== 'tree') return;

      const canvasRect = canvasEl.getBoundingClientRect();
      if (canvasRect.width === 0 || canvasRect.height === 0) return;

      const nodeRects = new Map();
      canvasEl.querySelectorAll('.tree-node[data-id]').forEach((node) => {
        const r = node.getBoundingClientRect();
        nodeRects.set(node.dataset.id, {
          left: r.left - canvasRect.left,
          right: r.right - canvasRect.left,
          top: r.top - canvasRect.top,
          bottom: r.bottom - canvasRect.top,
          width: r.width,
          height: r.height,
          centerX: r.left - canvasRect.left + r.width / 2,
          centerY: r.top - canvasRect.top + r.height / 2
        });
      });

      svgEl.setAttribute('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);
      svgEl.innerHTML = '';

      // Group parent relations by parent-gap key so horizontal rails can stagger cleanly
      const parentGroups = new Map();

      data.relations.forEach((rel) => {
        if (rel.type !== 'parent') return;
        const fromList = (Array.isArray(rel.from) ? rel.from : [rel.from]).filter((id) =>
          nodeRects.has(id)
        );
        if (!fromList.length || !nodeRects.has(rel.to)) return;

        const key = fromList.slice().sort().join('+');
        if (!parentGroups.has(key)) {
          parentGroups.set(key, { fromList, children: [] });
        }
        parentGroups.get(key).children.push(rel.to);
      });

      // Assign stagger index per parent generation
      const railIndexByParentKey = new Map();
      const countByGenBand = new Map();
      parentGroups.forEach((group, key) => {
        const firstParent = peopleById.get(group.fromList[0]);
        const gen = firstParent ? Number(firstParent.generation) || 1 : 1;
        const idx = countByGenBand.get(gen) || 0;
        countByGenBand.set(gen, idx + 1);
        railIndexByParentKey.set(key, { idx, total: 0, gen });
      });
      railIndexByParentKey.forEach((val) => {
        val.total = countByGenBand.get(val.gen) || 1;
      });

      // 1. Draw parent-child orthogonal paths with rounded elbows
      parentGroups.forEach((group, key) => {
        const parentRects = group.fromList.map((id) => nodeRects.get(id));
        const startX =
          parentRects.reduce((sum, r) => sum + r.centerX, 0) / parentRects.length;
        const startY =
          parentRects.length > 1
            ? Math.min(...parentRects.map((r) => r.bottom)) - 2
            : parentRects[0].bottom;

        const childRects = group.children.map((cid) => ({
          id: cid,
          rect: nodeRects.get(cid)
        }));
        const minChildTop = Math.min(...childRects.map((c) => c.rect.top));
        const rawGap = minChildTop - startY;
        const railMeta = railIndexByParentKey.get(key);
        const stagger =
          railMeta.total > 1
            ? ((railMeta.idx - (railMeta.total - 1) / 2) * Math.min(8, rawGap * 0.16))
            : 0;
        const midY = startY + rawGap * 0.5 + stagger;

        childRects.forEach(({ id: childId, rect: cr }) => {
          const endX = cr.centerX;
          const endY = cr.top;
          const dx = endX - startX;
          const r = 8;
          let d;

          if (Math.abs(dx) < 2 * r) {
            d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${startX.toFixed(1)} ${midY.toFixed(
              1
            )}, ${endX.toFixed(1)} ${midY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
          } else {
            const dir = dx > 0 ? 1 : -1;
            d = [
              `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
              `L ${startX.toFixed(1)} ${(midY - r).toFixed(1)}`,
              `Q ${startX.toFixed(1)} ${midY.toFixed(1)} ${(startX + dir * r).toFixed(
                1
              )} ${midY.toFixed(1)}`,
              `L ${(endX - dir * r).toFixed(1)} ${midY.toFixed(1)}`,
              `Q ${endX.toFixed(1)} ${midY.toFixed(1)} ${endX.toFixed(1)} ${(midY + r).toFixed(
                1
              )}`,
              `L ${endX.toFixed(1)} ${endY.toFixed(1)}`
            ].join(' ');
          }

          const endpoints = [...group.fromList, childId];
          svgEl.appendChild(createSvgPath(d, 'tree-path tree-path-parent', endpoints));
        });
      });

      // 2. Draw sibling paths
      let siblingIdx = 0;
      data.relations.forEach((rel) => {
        if (rel.type !== 'sibling') return;
        const fromId = Array.isArray(rel.from) ? rel.from[0] : rel.from;
        const toId = rel.to;
        const rA = nodeRects.get(fromId);
        const rB = nodeRects.get(toId);
        if (!rA || !rB) return;

        const sameRow = Math.abs(rA.top - rB.top) < 30;
        let d;

        if (sameRow) {
          const archLift = 13 + (siblingIdx % 2) * 5;
          siblingIdx += 1;
          const archY = Math.min(rA.top, rB.top) - archLift;
          const dx = rB.centerX - rA.centerX;
          const r = 6;
          const dir = dx >= 0 ? 1 : -1;

          d =
            Math.abs(dx) < 2 * r
              ? `M ${rA.centerX.toFixed(1)} ${rA.top.toFixed(1)} L ${rB.centerX.toFixed(
                  1
                )} ${rB.top.toFixed(1)}`
              : [
                  `M ${rA.centerX.toFixed(1)} ${rA.top.toFixed(1)}`,
                  `L ${rA.centerX.toFixed(1)} ${(archY + r).toFixed(1)}`,
                  `Q ${rA.centerX.toFixed(1)} ${archY.toFixed(1)} ${(
                    rA.centerX +
                    dir * r
                  ).toFixed(1)} ${archY.toFixed(1)}`,
                  `L ${(rB.centerX - dir * r).toFixed(1)} ${archY.toFixed(1)}`,
                  `Q ${rB.centerX.toFixed(1)} ${archY.toFixed(1)} ${rB.centerX.toFixed(
                    1
                  )} ${(archY + r).toFixed(1)}`,
                  `L ${rB.centerX.toFixed(1)} ${rB.top.toFixed(1)}`
                ].join(' ');
        } else {
          // Vertical side rail along the left edge when branches stack on narrow screens
          const railX = 5 + (siblingIdx % 2) * 4;
          siblingIdx += 1;
          const r = 6;
          const y1 = rA.centerY;
          const y2 = rB.centerY;
          const vDir = y2 >= y1 ? 1 : -1;
          d = [
            `M ${rA.left.toFixed(1)} ${y1.toFixed(1)}`,
            `L ${(railX + r).toFixed(1)} ${y1.toFixed(1)}`,
            `Q ${railX.toFixed(1)} ${y1.toFixed(1)} ${railX.toFixed(1)} ${(
              y1 +
              vDir * r
            ).toFixed(1)}`,
            `L ${railX.toFixed(1)} ${(y2 - vDir * r).toFixed(1)}`,
            `Q ${railX.toFixed(1)} ${y2.toFixed(1)} ${(railX + r).toFixed(1)} ${y2.toFixed(
              1
            )}`,
            `L ${rB.left.toFixed(1)} ${y2.toFixed(1)}`
          ].join(' ');
        }

        svgEl.appendChild(createSvgPath(d, 'tree-path tree-path-sibling', [fromId, toId]));
      });

      updateSelectionStyles();
    }

    function scheduleDrawTreeLines() {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(() => {
        rafPending = false;
        drawTreeLines();
      });
    }

    function updateSelectionStyles() {
      const allNodes = document.querySelectorAll('.tree-node[data-id], .list-member-btn[data-id]');
      const allPaths = svgEl.querySelectorAll('.tree-path');

      if (!selectedId) {
        allNodes.forEach((n) => n.classList.remove('is-selected', 'is-related', 'is-dimmed'));
        allPaths.forEach((p) => p.classList.remove('is-active', 'is-dimmed'));
        return;
      }

      const relatedIds = new Set(
        (adjRelations.get(selectedId) || []).map((rel) => rel.targetId)
      );

      allNodes.forEach((node) => {
        const id = node.dataset.id;
        node.classList.remove('is-selected', 'is-related', 'is-dimmed');
        if (id === selectedId) {
          node.classList.add('is-selected');
        } else if (relatedIds.has(id)) {
          node.classList.add('is-related');
        } else {
          node.classList.add('is-dimmed');
        }
      });

      allPaths.forEach((path) => {
        const endpoints = (path.dataset.endpoints || '').split(',');
        const isConnected = endpoints.includes(selectedId);
        path.classList.toggle('is-active', isConnected);
        path.classList.toggle('is-dimmed', !isConnected);
      });
    }

    function renderDetailDrawer(person) {
      detailEl.innerHTML = '';

      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'detail-close';
      closeBtn.setAttribute('aria-label', 'Luk persondetaljer');
      closeBtn.textContent = '✕';
      closeBtn.addEventListener('click', clearSelection);

      const header = document.createElement('div');
      header.className = 'detail-header';

      const crest = document.createElement('div');
      crest.className = 'detail-crest';
      crest.textContent = person.monogram || 'DL';

      const headerInfo = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.className = 'detail-mafia-name';
      nameEl.textContent = person.mafiaName;

      const metaEl = document.createElement('div');
      metaEl.className = 'detail-meta';
      metaEl.textContent = `${person.realName} · ${person.title}`;

      if (person.status === 'deceased') {
        const decBadge = document.createElement('span');
        decBadge.className = 'detail-deceased-badge';
        decBadge.textContent = '† Afdød';
        metaEl.appendChild(decBadge);
      }

      headerInfo.append(nameEl, metaEl);
      header.append(crest, headerInfo);

      const summaryEl = document.createElement('div');
      summaryEl.className = 'detail-summary';
      summaryEl.textContent = person.relationSummary || '';

      detailEl.append(closeBtn, header, summaryEl);

      function addProfileSection(label, text) {
        if (!text) return;
        const lbl = document.createElement('div');
        lbl.className = 'detail-section-label';
        lbl.textContent = label;
        const p = document.createElement('p');
        p.className = 'detail-bio';
        p.textContent = text;
        detailEl.append(lbl, p);
      }

      if (person.position || person.personality || person.reputation) {
        addProfileSection('Position i familien', person.position);
        addProfileSection('Personlighed', person.personality);
        addProfileSection('Omdømme', person.reputation);
      } else if (person.bio) {
        const bioEl = document.createElement('p');
        bioEl.className = 'detail-bio';
        bioEl.textContent = person.bio;
        detailEl.appendChild(bioEl);
      }

      if (person.quote) {
        const quoteEl = document.createElement('blockquote');
        quoteEl.className = 'detail-quote';
        quoteEl.textContent = `“${person.quote}”`;
        detailEl.appendChild(quoteEl);
      }

      if (Array.isArray(person.traits) && person.traits.length > 0) {
        const traitsWrap = document.createElement('div');
        traitsWrap.className = 'detail-traits';
        person.traits.forEach((trait) => {
          const chip = document.createElement('span');
          chip.className = 'detail-trait-chip';
          chip.textContent = trait;
          traitsWrap.appendChild(chip);
        });
        detailEl.appendChild(traitsWrap);
      }

      const rels = adjRelations.get(person.id) || [];
      if (rels.length > 0) {
        const relHeading = document.createElement('div');
        relHeading.className = 'detail-rel-heading';
        relHeading.textContent = 'Direkte forbindelser (tryk for at hoppe dertil)';
        detailEl.appendChild(relHeading);

        const pillsWrap = document.createElement('div');
        pillsWrap.className = 'detail-relations';

        rels.forEach((rel) => {
          const target = peopleById.get(rel.targetId);
          if (!target) return;

          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = `rel-pill rel-${rel.type}`;

          const typeSpan = document.createElement('span');
          typeSpan.className = 'rel-pill-type';
          typeSpan.textContent = `${rel.typeLabel}:`;

          const targetSpan = document.createElement('span');
          targetSpan.textContent = target.mafiaName;

          pill.append(typeSpan, targetSpan);
          pill.addEventListener('click', () => selectMember(target.id, true));
          pillsWrap.appendChild(pill);
        });

        detailEl.appendChild(pillsWrap);
      }

      detailEl.classList.add('active');
    }

    function clearSelection() {
      selectedId = null;
      detailEl.classList.remove('active');
      updateSelectionStyles();
    }

    function selectMember(id, scrollIntoTree) {
      if (!scrollIntoTree && selectedId === id) {
        clearSelection();
        return;
      }

      const person = peopleById.get(id);
      if (!person) return;

      selectedId = id;
      updateSelectionStyles();
      renderDetailDrawer(person);

      if (scrollIntoTree && currentView === 'tree') {
        const targetNode = canvasEl.querySelector(`.tree-node[data-id="${id}"]`);
        if (targetNode) {
          const nodeRect = targetNode.getBoundingClientRect();
          const vpRect = viewportEl.getBoundingClientRect();
          const targetLeft =
            viewportEl.scrollLeft +
            (nodeRect.left - vpRect.left) -
            (vpRect.width - nodeRect.width) / 2;
          viewportEl.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
        }
      }
    }

    function setView(mode) {
      currentView = mode;
      const isTree = mode === 'tree';

      if (viewTreeBtn) {
        viewTreeBtn.classList.toggle('active', isTree);
        viewTreeBtn.setAttribute('aria-pressed', String(isTree));
      }
      if (viewListBtn) {
        viewListBtn.classList.toggle('active', !isTree);
        viewListBtn.setAttribute('aria-pressed', String(!isTree));
      }

      viewportEl.classList.toggle('is-hidden', !isTree);
      listViewEl.classList.toggle('active', !isTree);
      const legendEl = document.querySelector('#tree-section .tree-legend');
      if (legendEl) legendEl.classList.toggle('is-hidden', !isTree);

      if (isTree) {
        scheduleDrawTreeLines();
      }
    }

    if (viewTreeBtn) viewTreeBtn.addEventListener('click', () => setView('tree'));
    if (viewListBtn) viewListBtn.addEventListener('click', () => setView('list'));

    renderTreeView();
    renderListView();
    scheduleDrawTreeLines();

    // Center top generation on mobile horizontal viewport on initial load
    window.requestAnimationFrame(() => {
      if (viewportEl.scrollWidth > viewportEl.clientWidth) {
        viewportEl.scrollLeft = (viewportEl.scrollWidth - viewportEl.clientWidth) / 2;
      }
      scheduleDrawTreeLines();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleDrawTreeLines);
    }

    if ('ResizeObserver' in window) {
      let resizeTimer = null;
      const ro = new ResizeObserver(() => {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(scheduleDrawTreeLines, 60);
      });
      ro.observe(canvasEl);
    } else {
      window.addEventListener('resize', scheduleDrawTreeLines);
    }
  }

  initFamilyTree();

  // ══════════════════════════════════════════════════════════════════════════
  //  4. HEMMELIGE ROLLER & KODER
  // ══════════════════════════════════════════════════════════════════════════
  const members = {
    CAPO01: {
      realName: 'Christopher',
      mafiaName: 'Don Christofo Di Legno',
      emoji: '👑',
      role: 'Don — Spilleder',
      sealBg: 'radial-gradient(circle at 35% 35%, #c9a84c, #7a5c10)',
      color: '#c9a84c',
      description:
        'Du er Don Christofo og aftenens spilleder (Gamemaster). Du kender alle 8 spilleres roller: 2 Forrædere (Aske & Jacob), 1 Efterforsker/Seer (Vanni), 1 Giftblander/Heks (Anne), 1 Snigskytte/Jæger (Sebastian) og 3 Familiemedlemmer (Tilde, Freddy & Christian).',
      secret: 'Du ved alt. Styr natten og hold orden i familien.',
      charSecret:
        'Don Christofo har gennem årene truffet beslutninger, som har skabt fjender både inden for og uden for familien. Mordet på hans bror Lorenzo kan være tættere forbundet med hans egen fortid, end han ønsker at indrømme.'
    },
    LUPO13: {
      realName: 'Aske',
      mafiaName: 'Ascanio Di Legno',
      emoji: '🗡️',
      role: 'Forræder (Varulv)',
      sealBg: 'radial-gradient(circle at 35% 35%, #555, #111)',
      color: '#f87171',
      description:
        'Du er én af familiens 2 forrædere (Varulve). Hver nat vågner I sammen i hemmelighed og vælger én spiller at eliminere. Om dagen skal I blande jer i debatten og skjule jeres identitet — ingen må opdage, at det er jer.',
      secret: 'Du er ulven i fåreklæder. Stol kun på din medskyldige om natten.',
      charSecret:
        'Ascanio har et særligt tæt forhold til sin mor og vil gøre næsten alt for at beskytte hende. Men hans loyalitet bliver sat på prøve, da han opdager, at hun muligvis skjuler noget afgørende om mordet på hans far Lorenzo.'
    },
    FRECCIA: {
      realName: 'Jacob',
      mafiaName: 'Giacomo Di Legno',
      emoji: '🗡️',
      role: 'Forræder (Varulv)',
      sealBg: 'radial-gradient(circle at 35% 35%, #555, #111)',
      color: '#f87171',
      description:
        'Du er én af familiens 2 forrædere (Varulve). Hver nat vågner I sammen i hemmelighed og vælger én spiller at eliminere. Om dagen skal I blande jer i debatten og skjule jeres identitet — ingen må opdage, at det er jer.',
      secret: 'Smil, charmér dem alle — og slå til, når mørket falder på.',
      charSecret:
        'Giacomo har en tendens til at leve lidt over evne og har muligvis oparbejdet en gæld til nogle af de forkerte mennesker. En gæld, som kan få alvorlige konsekvenser for hele familien. Han spiller måske et farligt dobbeltspil, og hvis sandheden kommer frem, kan det koste ham mere end blot familiens tillid.'
    },
    FIAMMA: {
      realName: 'Vanni',
      mafiaName: 'Vannissa Di Legno',
      emoji: '🔍',
      role: 'Efterforskeren (Seer)',
      sealBg: 'radial-gradient(circle at 35% 35%, #6a0dad, #2a004a)',
      color: '#c084fc',
      description:
        'Du er familiens Seer. Hver nat vågner du og peger på én spiller. Don Christofo nikker (hvis personen er forræder/varulv) eller ryster på hovedet (hvis personen er loyal). Brug din viden klogt i debatten uden at afsløre dig selv for tidligt.',
      secret: 'Du har øjne og ører overalt. Brug sandheden på det rette tidspunkt.',
      charSecret:
        'Vannissa har gennem længere tid haft kendskab til en hemmelighed, der kan ryste hele Di Legno-familien. Spørgsmålet er ikke, hvad hun ved — men hvem hun har valgt at fortælle det til.'
    },
    DOLCE9: {
      realName: 'Anne',
      mafiaName: 'Donna Anna Sophia Di Legno',
      emoji: '☠️',
      role: 'Giftblanderen (Heks)',
      sealBg: 'radial-gradient(circle at 35% 35%, #7a3a00, #2a1000)',
      color: '#fb923c',
      description:
        'Du er familiens Heks. Du har to éngangsbrygge i løbet af hele spillet: en livseliksir (redder nattens offer) og en gift (dræber en spiller efter eget valg). Du må gerne bruge begge samme nat, men kun én gang pr. eliksir i hele spillet.',
      secret: 'Du trækker i trådene over liv og død. Spild ikke dine dråber.',
      charSecret:
        'Anna Sophia ved langt mere om familiens interne konflikter, end hun giver udtryk for. Hun har muligvis kendt til truslen mod Don Christofos bror Lorenzo længe før mordet.'
    },
    PIETRA: {
      realName: 'Sebastian',
      mafiaName: 'Sebastiano Di Legno',
      emoji: '🔫',
      role: 'Snigskytten (Jæger)',
      sealBg: 'radial-gradient(circle at 35% 35%, #5a3a00, #1a0a00)',
      color: '#fbbf24',
      description:
        'Du er familiens Jæger. Du har ingen nat-evne, men hvis du bliver elimineret — enten om natten eller stemt ud om dagen — tager du straks én anden spiller med dig i døden via et sidste skud.',
      secret: 'Selv i døden leverer du dit sidste skud.',
      charSecret:
        'Sebastiano har gennem årene udført opgaver for familien, som ingen officielt kender til. Men han har en personlig mistanke om, at mordet på hans egen far Lorenzo ikke var tilfældigt. Måske er det nu blevet hans tur til at finde sandheden.'
    },
    LUMACA: {
      realName: 'Tilde',
      mafiaName: 'Matilda Di Legno',
      emoji: '👔',
      role: 'Familiemedlem',
      sealBg: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
      color: '#94a3b8',
      description:
        'Du er et loyalt familiemedlem (Landsbyboer) uden specielle nat-evner. Din styrke er debatten og afstemningen om dagen — observér, lyt og stem forræderne ud.',
      secret: 'Imperiet står på spil. Gennemsku løgnene ved bordet.',
      charSecret:
        'Matilda er begyndt at stille spørgsmålstegn ved sin fars beslutninger. Hun mener, at hun allerede er klar til at overtage magten, men Don Christofo har endnu ikke vist tegn på at give slip.'
    },
    OCCHIO: {
      realName: 'Freddy',
      mafiaName: 'Fredericca Di Legno',
      emoji: '👔',
      role: 'Familiemedlem',
      sealBg: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
      color: '#94a3b8',
      description:
        'Du er et loyalt familiemedlem (Landsbyboer) uden specielle nat-evner. Din styrke er debatten og afstemningen om dagen — observér, lyt og stem forræderne ud.',
      secret: 'Ingen lyver ustraffet for dig. Sæt dem på plads i rådet.',
      charSecret:
        'Fredericca er træt af altid at være andenprioritet. Hun drømmer om mere indflydelse i familien og er måske villig til at gå længere, end nogen forestiller sig, for at få den.'
    },
    ROCCIA: {
      realName: 'Christian',
      mafiaName: 'Cristiano Di Legno',
      emoji: '👔',
      role: 'Familiemedlem',
      sealBg: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
      color: '#94a3b8',
      description:
        'Du er et loyalt familiemedlem (Landsbyboer) uden specielle nat-evner. Din styrke er debatten og afstemningen om dagen — observér, lyt og stem forræderne ud.',
      secret: 'Hold hovedet koldt — de farligste løgne siges med et smil.',
      charSecret:
        'Cristiano har en vidunderlig kvinde i sit liv, som han elsker højt. Hun ved intet om hans mafiafamilie. Han har løjet for hende og lever et dobbeltliv for at beskytte hende fra sin families mørke verden. Hvad sker der, hvis hun en dag finder ud af, hvem han i virkeligheden er?'
    }
  };

  const codeInput = document.getElementById('codeInput');
  const codeSubmitBtn = document.getElementById('codeSubmitBtn');
  const codeErrorEl = document.getElementById('codeError');
  const revealOverlay = document.getElementById('reveal-overlay');
  const revealCloseBtn = document.getElementById('revealCloseBtn');

  let errTimer = null;

  function checkCode() {
    if (!codeInput) return;
    const raw = codeInput.value.trim().toUpperCase();
    const member = members[raw];

    if (!member) {
      if (codeErrorEl) {
        codeErrorEl.style.display = 'block';
        if (errTimer) window.clearTimeout(errTimer);
        errTimer = window.setTimeout(() => {
          codeErrorEl.style.display = 'none';
        }, 3000);
      }
      return;
    }

    if (codeErrorEl) codeErrorEl.style.display = 'none';
    document.getElementById('reveal-emoji').textContent = member.emoji;
    document.getElementById('reveal-seal').style.background = member.sealBg;
    document.getElementById('reveal-mafia-name').textContent = member.mafiaName;
    document.getElementById('reveal-real-name').textContent = member.realName;
    const roleEl = document.getElementById('reveal-role');
    roleEl.textContent = member.role;
    roleEl.style.color = member.color;
    document.getElementById('reveal-desc').textContent = member.description;
    document.getElementById('reveal-secret').textContent = '« ' + member.secret + ' »';
    const charSecretBox = document.getElementById('reveal-char-secret-box');
    const charSecretEl = document.getElementById('reveal-char-secret');
    if (charSecretBox && charSecretEl) {
      if (member.charSecret) {
        charSecretEl.textContent = member.charSecret;
        charSecretBox.style.display = 'block';
      } else {
        charSecretBox.style.display = 'none';
      }
    }

    if (revealOverlay) {
      revealOverlay.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeReveal() {
    if (revealOverlay) revealOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (codeInput) codeInput.value = '';
  }

  // Prefill ?k=CODE if present in URL
  (function prefillQueryCode() {
    if (!codeInput) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const codeParam = params.get('k');
      if (codeParam) {
        codeInput.value = codeParam.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 12);
      }
    } catch (_) {
      // Ignore malformed query string
    }
  })();

  if (codeSubmitBtn) codeSubmitBtn.addEventListener('click', checkCode);
  if (revealCloseBtn) revealCloseBtn.addEventListener('click', closeReveal);

  if (codeInput) {
    codeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkCode();
    });
  }

  if (revealOverlay) {
    revealOverlay.addEventListener('click', (e) => {
      if (e.target === revealOverlay) closeReveal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && revealOverlay && revealOverlay.classList.contains('active')) {
      closeReveal();
    }
  });
})();
