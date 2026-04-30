/* OSCM Simulator runtime extracted from index.html. */
// ==================== THEME & UI INITIALIZATION ====================
        function toggleTheme() {
            const h = document.documentElement;
            const c = h.getAttribute('data-theme');
            const n = c === 'dark' ? 'light' : 'dark';
            h.setAttribute('data-theme', n);
            document.getElementById('themeBtn').textContent = n === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('theme', n);
        }

        const st = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', st);
        if (st === 'dark' && document.getElementById('themeBtn')) {
            document.getElementById('themeBtn').textContent = '☀️';
        }

        function renderMath() {
            if (!window.MathJax) return;
            if (typeof MathJax.typesetPromise === 'function') {
                MathJax.typesetPromise().catch(e => console.warn('MathJax render warning:', e.message));
            } else if (typeof MathJax.typeset === 'function') {
                MathJax.typeset();
            }
        }

        // Module Navigation
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.addEventListener('click', () => {
                const m = b.dataset.module;
                document.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                document.querySelectorAll('.module').forEach(x => x.classList.remove('active'));
                const targetModule = document.getElementById(m + '-module');
                if (targetModule) {
                    targetModule.classList.add('active');
                    // Smooth scroll to top of module
                    targetModule.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                renderMath();
            });
        });

        // Tab Switching with animation
        function switchTab(el, mod, tab) {
            el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            document.querySelectorAll(`#${mod}-module .tab-content`).forEach(c => {
                c.classList.remove('active');
                c.style.opacity = '0';
            });
            const target = document.getElementById(mod + '-' + tab);
            if (target) {
                target.classList.add('active');
                // Fade-in animation
                requestAnimationFrame(() => {
                    target.style.opacity = '1';
                    target.style.transition = 'opacity 0.3s ease';
                });
            }
            renderMath();
        }

        // Enhanced Export — supports multiple formats
        function exportModule(moduleId) {
            const m = moduleId
                ? document.getElementById(moduleId + '-module')
                : document.querySelector('.module.active');
            if (!m) return;

            const moduleName = m.querySelector('.page-title')?.textContent?.trim() || 'OSCM_Export';
            const timestamp = new Date().toISOString().slice(0, 10);

            // Build structured export content
            let content = `OSCM Simulator Export\n`;
            content += `Module: ${moduleName}\n`;
            content += `Date: ${timestamp}\n`;
            content += `${'='.repeat(60)}\n\n`;

            // Extract theory sections
            m.querySelectorAll('.theory-section').forEach(sec => {
                const title = sec.querySelector('.theory-title')?.textContent || '';
                content += `## ${title}\n`;
                sec.querySelectorAll('p').forEach(p => content += p.textContent + '\n');
                content += '\n';
            });

            // Extract metric values
            content += `\n## Current Values\n`;
            m.querySelectorAll('.metric-card').forEach(card => {
                const val = card.querySelector('.metric-value')?.textContent || '';
                const label = card.querySelector('.metric-label')?.textContent || '';
                if (val && label) content += `  ${label}: ${val}\n`;
            });

            // Extract equation results
            content += `\n## Equations & Results\n`;
            m.querySelectorAll('.equation-box').forEach(eq => {
                const label = eq.querySelector('.equation-label')?.textContent || '';
                const result = eq.querySelector('.equation-result')?.textContent || '';
                if (label) content += `  ${label} ${result}\n`;
            });

            const b = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(b);
            a.download = `${moduleName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.txt`;
            a.click();
            URL.revokeObjectURL(a.href);
        }

        // ==================== MODAL & TUTORIAL ====================
        let tutStep = 1;
        const tutTotal = 4;

        function openTutorial() {
            document.getElementById('tut-modal').classList.add('active');
            tutStep = 1;
            updTut();
        }

        function closeTut() {
            document.getElementById('tut-modal').classList.remove('active');
        }

        function tutNext() {
            if (tutStep < tutTotal) { tutStep++; updTut(); }
            else closeTut();
        }

        function tutPrev() {
            if (tutStep > 1) { tutStep--; updTut(); }
        }

        function updTut() {
            document.querySelectorAll('.tut-step').forEach(s => s.classList.remove('active'));
            const step = document.querySelector(`.tut-step[data-s="${tutStep}"]`);
            if (step) step.classList.add('active');
            document.querySelectorAll('.tut-dot').forEach((d, i) => {
                d.classList.toggle('active', i === tutStep - 1);
            });
            const prevBtn = document.getElementById('tut-prev');
            const nextBtn = document.getElementById('tut-next');
            if (prevBtn) prevBtn.disabled = tutStep === 1;
            if (nextBtn) nextBtn.textContent = tutStep === tutTotal ? 'Finish' : 'Next';
            renderMath();
        }

        // ==================== ANIMATION ENGINE ====================
        let animOn = false;
        let animFrame = null;

        function toggleAnim() {
            animOn = !animOn;
            const btn = document.getElementById('anim-btn');
            if (btn) btn.textContent = animOn ? '⏸' : '▶';
            if (animOn) runAnim();
            else if (animFrame) cancelAnimationFrame(animFrame);
        }

        function runAnim() {
            if (!animOn) return;
            const pA = document.getElementById('p-a');
            if (!pA) return;
            let a = +pA.value;
            a = a >= 18 ? 1 : a + 1;
            pA.value = a;
            updPERT();
            const speed = +document.getElementById('anim-speed')?.value || 500;
            setTimeout(() => {
                animFrame = requestAnimationFrame(runAnim);
            }, speed);
        }

        // ==================== UTILITY FUNCTIONS ====================

        // Enhanced message display with auto-dismiss
        function showMsg(containerId, msg, isSuccess, autoDismiss = 5000) {
            const el = document.getElementById(containerId);
            if (!el) return;
            el.innerHTML = `<div class="alert-icon">${isSuccess ? '✅' : '⚠️'}</div><div>${msg}</div>`;
            el.className = 'alert mt-4 ' + (isSuccess ? 'alert-success' : 'alert-danger');
            el.style.display = 'flex';
            el.style.opacity = '0';
            requestAnimationFrame(() => {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = '1';
            });
            if (autoDismiss && isSuccess) {
                setTimeout(() => {
                    el.style.opacity = '0';
                    setTimeout(() => { el.style.display = 'none'; }, 300);
                }, autoDismiss);
            }
        }

        // Number formatting helpers
        function fmt(n, decimals = 2) {
            return Number(n).toFixed(decimals);
        }

        function fmtCurrency(n) {
            return '$' + Math.round(n).toLocaleString();
        }

        function fmtPercent(n, decimals = 1) {
            return (n * 100).toFixed(decimals) + '%';
        }

        // Safe element getter
        function getEl(id) {
            return document.getElementById(id);
        }

        function getVal(id) {
            const el = getEl(id);
            return el ? +el.value : 0;
        }

        function setText(id, text) {
            const el = getEl(id);
            if (el) el.textContent = text;
        }

        function setHTML(id, html) {
            const el = getEl(id);
            if (el) el.innerHTML = html;
        }

        // Z-score to probability lookup (standard normal CDF approximation)
        function normalCDF(z) {
            const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
            const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
            const sign = z < 0 ? -1 : 1;
            z = Math.abs(z) / Math.sqrt(2);
            const t = 1.0 / (1.0 + p * z);
            const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
            return 0.5 * (1.0 + sign * y);
        }

        // PPM calculation from Cpk
        function cpkToPPM(cpk) {
            if (cpk <= 0) return 1000000;
            const z = cpk * 3;
            const pOutside = 2 * (1 - normalCDF(z));
            return Math.round(pOutside * 1000000);
        }

        // ============================================================
        // PERT MODULE — Enhanced with Z-score probability & path analysis
        // ============================================================
        let curProb = {};
        let pertHistory = []; // Track calculation history

        function updPERT() {
            const pA = getEl('p-a');
            if (!pA) return;
            const pM = getEl('p-m'), pB = getEl('p-b');
            const a = +pA.value, m = +pM.value, b = +pB.value;

            setText('p-a-v', a);
            setText('p-m-v', m);
            setText('p-b-v', b);

            // Validate: a ≤ m ≤ b
            const valid = a <= m && m <= b;
            const warnEl = getEl('p-warn');
            if (warnEl) warnEl.style.display = valid ? 'none' : 'flex';

            // Core PERT calculations
            const te = (a + 4 * m + b) / 6;
            const v = Math.pow((b - a) / 6, 2);
            const sd = Math.sqrt(v);

            // Confidence intervals
            const ci68 = [Math.max(0, te - sd), te + sd];
            const ci95 = [Math.max(0, te - 2 * sd), te + 2 * sd];
            const ci99 = [Math.max(0, te - 3 * sd), te + 3 * sd];

            // Skewness indicator (Beta distribution asymmetry)
            const skewness = (a + b - 2 * m) / (b - a);
            const skewLabel = Math.abs(skewness) < 0.1 ? 'Symmetric' :
                skewness > 0 ? 'Right-skewed (optimistic bias)' : 'Left-skewed (pessimistic bias)';

            // Update formula displays with proper LaTeX
            setHTML('p-te-f', `\\[T_E = \\frac{${a}+4(${m})+${b}}{6}\\]`);
            setText('p-te-r', `=${fmt(te)}`);
            setHTML('p-var-f', `\\[\\sigma^2 = \\left(\\frac{${b}-${a}}{6}\\right)^2\\]`);
            setText('p-var-r', `=${fmt(v)}`);

            // Update metric cards
            setText('p-te-m', fmt(te));
            setText('p-var-m', fmt(v));
            setText('p-sd-m', fmt(sd));

            // Update network diagram elements
            const nodeEl = getEl('p-node');
            if (nodeEl) nodeEl.textContent = `T=${fmt(te, 1)}`;
            const rangeEl = getEl('p-range');
            if (rangeEl) rangeEl.textContent = `${a}–${b}`;

            // Update overview dashboard cards
            setText('ov-te', fmt(te));
            setText('ov-var', fmt(v));
            setText('ov-sd', fmt(sd));

            // Store in history for trend analysis
            pertHistory.push({ a, m, b, te, v, sd, timestamp: Date.now() });
            if (pertHistory.length > 50) pertHistory.shift();

            renderMath();
        }

        // Enhanced Practice Problem Generator with difficulty levels
        let practiceCount = 0;
        let practiceScore = { correct: 0, total: 0 };

        function genPractice() {
            practiceCount++;
            const difficulty = practiceCount <= 3 ? 'easy' : practiceCount <= 7 ? 'medium' : 'hard';

            let a, m, b;
            if (difficulty === 'easy') {
                a = 2 + Math.floor(Math.random() * 3);
                m = a + 2 + Math.floor(Math.random() * 3);
                b = m + 2 + Math.floor(Math.random() * 4);
            } else if (difficulty === 'medium') {
                a = 1 + Math.floor(Math.random() * 5);
                m = a + 2 + Math.floor(Math.random() * 5);
                b = m + 3 + Math.floor(Math.random() * 8);
            } else {
                a = 1 + Math.floor(Math.random() * 8);
                m = a + 1 + Math.floor(Math.random() * 8);
                b = m + 2 + Math.floor(Math.random() * 15);
            }

            curProb = {
                a, m, b,
                te: (a + 4 * m + b) / 6,
                v: Math.pow((b - a) / 6, 2),
                sd: (b - a) / 6,
                difficulty
            };

            const diffBadge = difficulty === 'easy' ? '🟢 Easy' : difficulty === 'medium' ? '🟡 Medium' : '🔴 Hard';

            setHTML('prac-q', `<span style="font-size:0.75rem;opacity:0.7">${diffBadge} | Problem #${practiceCount}</span><br>
            A project activity has estimates: <strong>a = ${a}</strong>, <strong>m = ${m}</strong>, <strong>b = ${b}</strong>.<br>
            Calculate the Expected Time (T<sub>E</sub>) and Variance (σ²).`);

            const teInput = getEl('prac-te');
            const varInput = getEl('prac-var');
            if (teInput) teInput.value = '';
            if (varInput) varInput.value = '';

            const ansEl = getEl('prac-ans');
            if (ansEl) ansEl.classList.remove('show');
            const msgEl = getEl('prac-msg');
            if (msgEl) msgEl.style.display = 'none';
        }

        function checkAns() {
            const ut = +getEl('prac-te')?.value;
            const uv = +getEl('prac-var')?.value;

            if (!ut && !uv) {
                showMsg('prac-msg', 'Please enter your answers before checking.', false);
                return;
            }

            const teCorrect = Math.abs(ut - curProb.te) < 0.1;
            const varCorrect = Math.abs(uv - curProb.v) < 0.1;

            practiceScore.total++;

            if (teCorrect && varCorrect) {
                practiceScore.correct++;
                showMsg('prac-msg',
                    `🎉 <strong>Correct!</strong> Both T<sub>E</sub> = ${fmt(curProb.te)} and σ² = ${fmt(curProb.v)} are right!
                 <br><small>Score: ${practiceScore.correct}/${practiceScore.total} (${Math.round(practiceScore.correct / practiceScore.total * 100)}%)</small>`,
                    true);
            } else if (teCorrect) {
                showMsg('prac-msg', `T<sub>E</sub> is correct (${fmt(curProb.te)}), but σ² is incorrect. Expected: ${fmt(curProb.v)}. Remember: σ² = ((b−a)/6)²`, false);
            } else if (varCorrect) {
                showMsg('prac-msg', `σ² is correct (${fmt(curProb.v)}), but T<sub>E</sub> is incorrect. Expected: ${fmt(curProb.te)}. Remember: T<sub>E</sub> = (a+4m+b)/6`, false);
            } else {
                showMsg('prac-msg', `Both answers need correction. Try again or click <strong>Show Solution</strong> for a step-by-step walkthrough.`, false);
            }
        }

        function showSol() {
            const { a, m, b, te, v, sd } = curProb;
            const numerator = a + 4 * m + b;
            const range = b - a;

            setHTML('prac-sol', `
            <div style="margin-bottom:12px">
                <strong>Step 1: Expected Time (T<sub>E</sub>)</strong><br>
                T<sub>E</sub> = (a + 4m + b) / 6<br>
                T<sub>E</sub> = (${a} + 4×${m} + ${b}) / 6<br>
                T<sub>E</sub> = (${a} + ${4 * m} + ${b}) / 6<br>
                T<sub>E</sub> = ${numerator} / 6 = <strong>${fmt(te)}</strong>
            </div>
            <div style="margin-bottom:12px">
                <strong>Step 2: Variance (σ²)</strong><br>
                σ² = ((b − a) / 6)²<br>
                σ² = ((${b} − ${a}) / 6)²<br>
                σ² = (${range} / 6)²<br>
                σ² = (${fmt(range / 6, 4)})² = <strong>${fmt(v)}</strong>
            </div>
            <div>
                <strong>Step 3: Standard Deviation (σ)</strong><br>
                σ = √σ² = √${fmt(v)} = <strong>${fmt(sd)}</strong><br>
                <small>95% confidence interval: [${fmt(Math.max(0, te - 2 * sd))}, ${fmt(te + 2 * sd)}]</small>
            </div>
        `);
            const ansEl = getEl('prac-ans');
            if (ansEl) ansEl.classList.add('show');
        }

        // Enhanced Sensitivity Analysis with visual indicators
        function genSens() {
            const a = getVal('p-a'), m = getVal('p-m'), b = getVal('p-b');
            const baseTE = (a + 4 * m + b) / 6;
            const baseVar = Math.pow((b - a) / 6, 2);

            let html = `<h4 style="margin-bottom:12px;font-size:0.88rem">Sensitivity of T<sub>E</sub> to changes in Most Likely (m)</h4>`;
            html += '<table class="data-table"><thead><tr><th>m Value</th><th>T<sub>E</sub></th><th>Change</th><th>% Change</th><th>Impact</th></tr></thead><tbody>';

            for (let d = -5; d <= 5; d++) {
                const nm = m + d;
                if (nm < a || nm > b) continue;
                const te = (a + 4 * nm + b) / 6;
                const ch = te - baseTE;
                const pctCh = baseTE !== 0 ? (ch / baseTE * 100) : 0;
                const impact = Math.abs(pctCh) < 3 ? '🟢 Low' : Math.abs(pctCh) < 8 ? '🟡 Medium' : '🔴 High';

                html += `<tr${d === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${nm}${d === 0 ? ' ← current' : ''}</td>
                <td>${fmt(te)}</td>
                <td class="${ch > 0 ? 'danger-cell' : ch < 0 ? 'highlight-cell' : ''}">${ch >= 0 ? '+' : ''}${fmt(ch)}</td>
                <td>${pctCh >= 0 ? '+' : ''}${fmt(pctCh, 1)}%</td>
                <td>${impact}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            // Add sensitivity for b (pessimistic) as well
            html += `<h4 style="margin:20px 0 12px;font-size:0.88rem">Sensitivity of Variance (σ²) to changes in Pessimistic (b)</h4>`;
            html += '<table class="data-table"><thead><tr><th>b Value</th><th>σ²</th><th>σ</th><th>Change in σ²</th><th>Risk Level</th></tr></thead><tbody>';

            for (let d = -4; d <= 4; d += 2) {
                const nb = b + d;
                if (nb <= m) continue;
                const nv = Math.pow((nb - a) / 6, 2);
                const nsd = Math.sqrt(nv);
                const ch = nv - baseVar;
                const risk = nv < 2 ? '🟢 Low Risk' : nv < 6 ? '🟡 Moderate' : '🔴 High Risk';

                html += `<tr${d === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${nb}${d === 0 ? ' ← current' : ''}</td>
                <td>${fmt(nv)}</td>
                <td>${fmt(nsd)}</td>
                <td>${ch >= 0 ? '+' : ''}${fmt(ch)}</td>
                <td>${risk}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            setHTML('sens-result', html);
        }

        // Enhanced Scenario Comparison with comprehensive metrics
        function compareScen() {
            const a1 = getVal('cmp-a1'), m1 = getVal('cmp-m1'), b1 = getVal('cmp-b1');
            const a2 = getVal('cmp-a2'), m2 = getVal('cmp-m2'), b2 = getVal('cmp-b2');

            const te1 = (a1 + 4 * m1 + b1) / 6;
            const te2 = (a2 + 4 * m2 + b2) / 6;
            const v1 = Math.pow((b1 - a1) / 6, 2);
            const v2 = Math.pow((b2 - a2) / 6, 2);
            const sd1 = Math.sqrt(v1);
            const sd2 = Math.sqrt(v2);

            setText('cmp-te1', fmt(te1));
            setText('cmp-te2', fmt(te2));

            const diff = te2 - te1;
            const vDiff = v2 - v1;
            const pctDiff = te1 !== 0 ? (diff / te1 * 100) : 0;

            const recommendation = (te2 < te1 && v2 <= v1) ? '✅ Scenario B is better (faster & less risky)' :
                (te2 > te1 && v2 >= v1) ? '✅ Scenario A is better (faster & less risky)' :
                    '⚖️ Trade-off: Consider risk tolerance vs. speed requirements';

            setHTML('cmp-text', `
            <strong>Time Comparison:</strong> Scenario B is <strong>${Math.abs(diff).toFixed(2)} days ${diff > 0 ? 'longer' : 'shorter'}</strong> than A (${pctDiff >= 0 ? '+' : ''}${fmt(pctDiff, 1)}%).<br>
            <strong>Risk Comparison:</strong> Scenario B variance is ${fmt(Math.abs(vDiff))} ${vDiff > 0 ? 'higher' : 'lower'} (σ: ${fmt(sd1)} vs ${fmt(sd2)}).<br>
            <strong>Recommendation:</strong> ${recommendation}
        `);

            const resultEl = getEl('cmp-result');
            if (resultEl) resultEl.style.display = 'flex';
        }

        // ============================================================
        // BREAK-EVEN MODULE — Enhanced with profit analysis & multi-product
        // ============================================================
        function updBE() {
            const bFC = getEl('be-fc');
            if (!bFC) return;
            const fc = +bFC.value, p = +getEl('be-p').value, vc = +getEl('be-vc').value;

            setText('be-fc-v', '$' + fc.toLocaleString());
            setText('be-p-v', '$' + p);
            setText('be-vc-v', '$' + vc);

            // Validate: Price must exceed Variable Cost
            if (vc >= p) {
                setHTML('be-bep-f', `\\[\\text{Error: Price (\\$${p}) must exceed Variable Cost (\\$${vc})}\\]`);
                setText('be-bep-r', '= N/A');
                setText('be-u-m', 'N/A');
                setText('be-r-m', 'N/A');
                return;
            }

            const cm = p - vc;                    // Contribution margin
            const cmRatio = cm / p;               // Contribution margin ratio
            const bep = fc / cm;                  // Break-even units
            const rev = bep * p;                  // Break-even revenue
            const bepDollars = fc / cmRatio;      // Break-even in dollars

            // Update formula displays
            setHTML('be-bep-f', `\\[BEP = \\frac{${fc.toLocaleString()}}{${p} - ${vc}} = \\frac{${fc.toLocaleString()}}{${cm}}\\]`);
            setText('be-bep-r', `= ${Math.round(bep).toLocaleString()} units`);
            setText('be-u-m', Math.round(bep).toLocaleString());

            // Format revenue display
            if (rev >= 1000000) {
                setText('be-r-m', '$' + (rev / 1000000).toFixed(2) + 'M');
            } else if (rev >= 1000) {
                setText('be-r-m', '$' + Math.round(rev / 1000) + 'K');
            } else {
                setText('be-r-m', '$' + Math.round(rev));
            }

            renderMath();
        }

        let beProb = {};

        function genBePractice() {
            const fc = (10 + Math.floor(Math.random() * 40)) * 1000;
            const vc = 10 + Math.floor(Math.random() * 40);
            const p = vc + 10 + Math.floor(Math.random() * 40);
            const bep = Math.ceil(fc / (p - vc));
            const cm = p - vc;
            const bepRev = bep * p;
            beProb = { fc, vc, p, bep, cm, bepRev };

            const qEl = getEl('be-prac-q');
            if (!qEl) return;
            qEl.innerHTML = `A company has <strong>Fixed Costs = $${fc.toLocaleString()}</strong>, sells at <strong>Price = $${p}/unit</strong>, with <strong>Variable Cost = $${vc}/unit</strong>.<br>Calculate the Break-Even Point in units.`;

            const input = getEl('be-prac-ans-input');
            if (input) input.value = '';
            const ansEl = getEl('be-prac-ans');
            if (ansEl) ansEl.classList.remove('show');
            const msgEl = getEl('be-prac-msg');
            if (msgEl) msgEl.style.display = 'none';
        }

        function checkBeAns() {
            const user = +getEl('be-prac-ans-input')?.value;
            if (!user) {
                showMsg('be-prac-msg', 'Please enter your answer.', false);
                return;
            }
            // Allow ±1 unit tolerance for rounding
            if (Math.abs(user - beProb.bep) <= 1) {
                showMsg('be-prac-msg', `🎉 <strong>Correct!</strong> BEP = ${beProb.bep.toLocaleString()} units. Contribution margin = $${beProb.cm}/unit.`, true);
            } else {
                showMsg('be-prac-msg', `Not quite. Your answer: ${user.toLocaleString()} units. Try again or click Show Solution.`, false);
            }
        }

        function showBeSol() {
            setHTML('be-prac-sol', `
            <div style="margin-bottom:8px">
                <strong>Step 1: Calculate Contribution Margin</strong><br>
                CM = Price − Variable Cost = $${beProb.p} − $${beProb.vc} = <strong>$${beProb.cm}/unit</strong>
            </div>
            <div style="margin-bottom:8px">
                <strong>Step 2: Calculate Break-Even Point</strong><br>
                BEP = Fixed Costs / CM = $${beProb.fc.toLocaleString()} / $${beProb.cm} = <strong>${beProb.bep.toLocaleString()} units</strong>
            </div>
            <div>
                <strong>Step 3: Break-Even Revenue</strong><br>
                BEP Revenue = ${beProb.bep.toLocaleString()} × $${beProb.p} = <strong>$${beProb.bepRev.toLocaleString()}</strong>
            </div>
        `);
            const ansEl = getEl('be-prac-ans');
            if (ansEl) ansEl.classList.add('show');
        }

        // Enhanced Break-Even Sensitivity with multiple parameters
        function genBeSens() {
            const fc = getVal('be-fc'), p = getVal('be-p'), vc = getVal('be-vc');
            if (vc >= p) return;
            const baseBep = fc / (p - vc);

            let html = `<h4 style="margin-bottom:12px;font-size:0.88rem">Impact of Price Changes on BEP</h4>`;
            html += '<table class="data-table"><thead><tr><th>Price Change</th><th>New Price</th><th>CM/Unit</th><th>New BEP</th><th>BEP Change</th></tr></thead><tbody>';

            for (let d = -20; d <= 20; d += 10) {
                const np = p * (1 + d / 100);
                if (np <= vc) continue;
                const ncm = np - vc;
                const nbep = fc / ncm;
                const ch = nbep - baseBep;
                html += `<tr${d === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${d > 0 ? '+' : ''}${d}%${d === 0 ? ' ← current' : ''}</td>
                <td>$${np.toFixed(2)}</td>
                <td>$${ncm.toFixed(2)}</td>
                <td>${Math.round(nbep).toLocaleString()}</td>
                <td class="${ch > 0 ? 'danger-cell' : 'highlight-cell'}">${ch > 0 ? '+' : ''}${Math.round(ch).toLocaleString()}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            // Add fixed cost sensitivity
            html += `<h4 style="margin:20px 0 12px;font-size:0.88rem">Impact of Fixed Cost Changes on BEP</h4>`;
            html += '<table class="data-table"><thead><tr><th>FC Change</th><th>New FC</th><th>New BEP</th><th>BEP Change</th></tr></thead><tbody>';

            for (let d = -20; d <= 20; d += 10) {
                const nfc = fc * (1 + d / 100);
                const nbep = nfc / (p - vc);
                const ch = nbep - baseBep;
                html += `<tr${d === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${d > 0 ? '+' : ''}${d}%${d === 0 ? ' ← current' : ''}</td>
                <td>$${Math.round(nfc).toLocaleString()}</td>
                <td>${Math.round(nbep).toLocaleString()}</td>
                <td class="${ch > 0 ? 'danger-cell' : 'highlight-cell'}">${ch > 0 ? '+' : ''}${Math.round(ch).toLocaleString()}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            setHTML('be-sens-result', html);
        }

        function compareBeScen() {
            const fc1 = getVal('cmp-be-fc1'), p1 = getVal('cmp-be-p1'), vc1 = getVal('cmp-be-vc1');
            const fc2 = getVal('cmp-be-fc2'), p2 = getVal('cmp-be-p2'), vc2 = getVal('cmp-be-vc2');

            if (p1 <= vc1 || p2 <= vc2) {
                showMsg('cmp-be-result', 'Error: Price must exceed Variable Cost in both scenarios.', false);
                return;
            }

            const bep1 = fc1 / (p1 - vc1), bep2 = fc2 / (p2 - vc2);
            const cm1 = p1 - vc1, cm2 = p2 - vc2;

            setText('cmp-be-bep1', Math.round(bep1).toLocaleString());
            setText('cmp-be-bep2', Math.round(bep2).toLocaleString());

            const diff = bep2 - bep1;

            // Calculate indifference point (where both scenarios have equal total cost)
            let indifference = '';
            if (vc1 !== vc2) {
                const indiffQ = (fc2 - fc1) / (vc1 - vc2);
                if (indiffQ > 0) {
                    indifference = `<br><strong>Indifference Point:</strong> At ${Math.round(indiffQ).toLocaleString()} units, both scenarios have equal total cost. Below this → choose ${vc1 < vc2 ? 'B' : 'A'}; Above this → choose ${vc1 < vc2 ? 'A' : 'B'}.`;
                }
            }

            setHTML('cmp-be-text', `
            Scenario B requires <strong>${Math.abs(Math.round(diff)).toLocaleString()} ${diff > 0 ? 'more' : 'fewer'} units</strong> to break even.<br>
            <strong>CM/Unit:</strong> A = $${cm1} | B = $${cm2} (${cm2 > cm1 ? 'B has higher margin' : 'A has higher margin'})${indifference}
        `);

            const resultEl = getEl('cmp-be-result');
            if (resultEl) resultEl.style.display = 'flex';
        }

        // ============================================================
        // DECISION TREE MODULE — Enhanced with EVPI & multi-state analysis
        // ============================================================
        function updDT() {
            const dP = getEl('dt-p');
            if (!dP) return;
            const p = +dP.value / 100, q = 1 - p;
            setText('dt-p-v', p.toFixed(2));

            const v1 = getVal('dt-v1'), v2 = getVal('dt-v2');
            const v3 = getVal('dt-v3'), v4 = getVal('dt-v4');

            // EMV calculations
            const e1 = p * v1 + q * v2;  // Large facility
            const e2 = p * v3 + q * v4;  // Small facility

            // Expected Value with Perfect Information (EVPI)
            const evWithPI = p * Math.max(v1, v3) + q * Math.max(v2, v4);
            const bestEMV = Math.max(e1, e2);
            const evpi = evWithPI - bestEMV;

            // Standard deviation of each option (risk measure)
            const sd1 = Math.sqrt(p * Math.pow(v1 - e1, 2) + q * Math.pow(v2 - e1, 2));
            const sd2 = Math.sqrt(p * Math.pow(v3 - e2, 2) + q * Math.pow(v4 - e2, 2));

            // Coefficient of variation (risk per unit of return)
            const cv1 = e1 !== 0 ? (sd1 / Math.abs(e1)) : Infinity;
            const cv2 = e2 !== 0 ? (sd2 / Math.abs(e2)) : Infinity;

            setText('dt-e1', fmtCurrency(e1));
            setText('dt-e2', fmtCurrency(e2));

            const lc = getEl('dt-lc'), sc = getEl('dt-sc');
            if (lc && sc) {
                if (e1 > e2) {
                    lc.classList.add('highlight'); sc.classList.remove('highlight');
                } else {
                    sc.classList.add('highlight'); lc.classList.remove('highlight');
                }
            }

            const winner = e1 >= e2 ? 'Large' : 'Small';
            const winnerEMV = Math.max(e1, e2);

            setHTML('dt-rec-t', `
            <strong>Choose ${winner} Facility</strong> (EMV ${fmtCurrency(winnerEMV)})<br>
            <small>EVPI = ${fmtCurrency(evpi)} | Risk (σ): Large = ${fmtCurrency(sd1)}, Small = ${fmtCurrency(sd2)}</small>
        `);
        }

        // ============================================================
        // LEARNING CURVES MODULE — Enhanced with cumulative calculations
        // ============================================================
        function updLC() {
            const lcK = getEl('lc-k');
            if (!lcK) return;
            const k = +lcK.value, b = +getEl('lc-b').value / 100;
            const n = Math.log(b) / Math.log(2);

            setText('lc-k-v', k);
            setText('lc-b-v', Math.round(b * 100));

            setHTML('lc-n-f', `\\[n = \\frac{\\log(${b.toFixed(2)})}{\\log(2)}\\]`);
            setText('lc-n-r', `=${n.toFixed(3)}`);

            const r = getEl('lc-row');
            if (r) {
                r.innerHTML = '<td><strong>Hrs</strong></td>';
                [1, 2, 4, 8, 16, 32, 64, 128].forEach(x => {
                    const unitTime = k * Math.pow(x, n);
                    r.innerHTML += `<td>${unitTime.toFixed(1)}</td>`;
                });
            }

            renderMath();
        }

        // ============================================================
        // LINE BALANCING MODULE — Enhanced with detailed station analysis
        // ============================================================
        function updLB() {
            const lbT = getEl('lb-prodtime');
            if (!lbT) return;
            const t = +lbT.value, o = +getEl('lb-output').value;
            const st = +getEl('lb-sumtask').value, s = +getEl('lb-stations').value;

            setText('lb-t-v', t);
            setText('lb-o-v', o);
            setText('lb-s-v', s);

            if (o === 0) return;

            const c = t / o;                          // Cycle time
            const nMin = Math.ceil(st / c);            // Theoretical minimum stations
            const eff = (st / (s * c)) * 100;          // Efficiency
            const balanceDelay = 100 - eff;            // Balance delay
            const totalIdle = s * c - st;              // Total idle time

            setHTML('lb-c-f', `\\[C = \\frac{${t}}{${o}}\\]`);
            setText('lb-c-r', `=${c.toFixed(1)} min`);
            setHTML('lb-e-f', `\\[Eff = \\frac{${st}}{${s} \\times ${c.toFixed(1)}} \\times 100\\]`);
            setText('lb-e-r', `=${eff.toFixed(1)}%`);

            setText('lb-c-m', c.toFixed(1));
            setText('lb-n-m', nMin);
            setText('lb-e-m', eff.toFixed(1) + '%');
            setText('lb-cycle', Math.round(c) + 's');
            setText('lb-nmin', nMin);
            setText('lb-eff', eff.toFixed(1) + '%');
            setText('lb-delay', balanceDelay.toFixed(1) + '%');
            setText('lb-idle', Math.round(totalIdle) + 's');

            // Workstation visualization with utilization bars
            const vis = getEl('lb-vis');
            if (vis) {
                vis.innerHTML = '';
                const avgTaskPerStation = st / s;

                for (let i = 1; i <= s; i++) {
                    const u = Math.min(100, (avgTaskPerStation / c) * 100);
                    const color = u >= 90 ? '#10b981' : u >= 70 ? '#f59e0b' : '#ef4444';
                    const d = document.createElement('div');
                    d.style.cssText = `width:75px;height:75px;background:linear-gradient(to top,${color} ${u}%,var(--border-color) ${u}%);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${u > 50 ? 'white' : 'var(--text-primary)'};font-weight:bold;font-size:.72rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:transform 0.2s`;
                    d.innerHTML = `WS${i}<br>${u.toFixed(0)}%`;
                    d.onmouseenter = () => d.style.transform = 'scale(1.1)';
                    d.onmouseleave = () => d.style.transform = 'scale(1)';
                    vis.appendChild(d);
                }
            }

            renderMath();
        }

        // ============================================================
        // LITTLE'S LAW MODULE — Enhanced with scenario modeling
        // ============================================================
        function updLL() {
            const llR = getEl('ll-r');
            if (!llR) return;
            const r = +llR.value, t = +getEl('ll-t').value;
            const w = r * t;

            setText('ll-r-v', r);
            setText('ll-t-v', t);
            setHTML('ll-f', `\\[I = ${r} \\times ${t}\\]`);
            setText('ll-r2', `=${w}`);
            setText('ll-wip', w);
            setText('ll-wip2', w);

            renderMath();
        }

        // ============================================================
        // QUEUING THEORY MODULE — Enhanced with full M/M/1 metrics
        // ============================================================
        function updQ() {
            const qL = getEl('q-l');
            if (!qL) return;
            const l = +qL.value, m = +getEl('q-m').value;

            setText('q-l-v', l);
            setText('q-m-v', m);
            setText('q-sv', 'μ=' + m);

            const rho = l / m;
            const ok = rho < 1 && l > 0 && m > 0;

            // Full M/M/1 calculations
            let lq = 0, ls = 0, wq = 0, ws = 0, p0 = 0;
            if (ok) {
                lq = (l * l) / (m * (m - l));           // Avg in queue
                ls = l / (m - l);                         // Avg in system
                wq = l / (m * (m - l));                   // Avg wait in queue
                ws = 1 / (m - l);                         // Avg time in system
                p0 = 1 - rho;                             // P(empty system)
            }

            // Update formula displays
            setHTML('q-rho-f', `\\[\\rho = \\frac{${l}}{${m}}\\]`);
            setText('q-rho-r', `=${rho.toFixed(2)}`);
            setHTML('q-lq-f', `\\[L_q = \\frac{${l}^2}{${m}(${m} - ${l})}\\]`);
            setText('q-lq-r', ok ? `=${lq.toFixed(2)}` : '=∞');

            setText('q-rho-m', fmtPercent(rho));
            setText('q-lq-m', ok ? lq.toFixed(2) : '∞');

            const alertEl = getEl('q-alert');
            if (alertEl) alertEl.style.display = ok ? 'none' : 'flex';

            // Queue visualization with animated dots
            const ql = getEl('q-ql');
            if (ql) {
                ql.innerHTML = '';
                const n = ok ? Math.min(15, Math.round(lq)) : 15;
                for (let i = 0; i < n; i++) {
                    const d = document.createElement('div');
                    d.className = 'customer-dot';
                    d.style.animationDelay = (i * 0.1) + 's';
                    d.title = `Customer ${i + 1}`;
                    ql.appendChild(d);
                }
            }

            renderMath();
        }

        // Queuing Practice Problems
        let qProb = {};

        function genQPractice() {
            const m = 15 + Math.floor(Math.random() * 10);
            const l = m - Math.floor(Math.random() * 8) - 2;
            const lq = (l * l) / (m * (m - l));
            const rho = l / m;
            const ws = 1 / (m - l);
            qProb = { l, m, lq, rho, ws };

            const qEl = getEl('q-prac-q');
            if (!qEl) return;
            qEl.innerHTML = `A service center has <strong>Arrival Rate (λ) = ${l}/hr</strong> and <strong>Service Rate (μ) = ${m}/hr</strong>.<br>Calculate the Average Number in Queue (L<sub>q</sub>). Round to 2 decimal places.`;

            const input = getEl('q-prac-ans-input');
            if (input) input.value = '';
            const ansEl = getEl('q-prac-ans');
            if (ansEl) ansEl.classList.remove('show');
            const msgEl = getEl('q-prac-msg');
            if (msgEl) msgEl.style.display = 'none';
        }

        function checkQAns() {
            const user = +getEl('q-prac-ans-input')?.value;
            if (!user && user !== 0) {
                showMsg('q-prac-msg', 'Please enter your answer.', false);
                return;
            }
            if (Math.abs(user - qProb.lq) <= 0.1) {
                showMsg('q-prac-msg', `🎉 <strong>Correct!</strong> L<sub>q</sub> = ${qProb.lq.toFixed(2)} customers. Utilization ρ = ${fmtPercent(qProb.rho)}.`, true);
            } else {
                showMsg('q-prac-msg', `Not quite (your answer: ${user}). Try again or click Show Solution.`, false);
            }
        }

        function showQSol() {
            const { l, m, lq, rho, ws } = qProb;
            setHTML('q-prac-sol', `
            <div style="margin-bottom:8px">
                <strong>Step 1: Check Stability</strong><br>
                ρ = λ/μ = ${l}/${m} = ${rho.toFixed(3)} < 1 ✓ (System is stable)
            </div>
            <div style="margin-bottom:8px">
                <strong>Step 2: Calculate L<sub>q</sub></strong><br>
                L<sub>q</sub> = λ² / [μ(μ − λ)] = ${l}² / [${m}(${m} − ${l})]<br>
                L<sub>q</sub> = ${l * l} / [${m} × ${m - l}] = ${l * l} / ${m * (m - l)}<br>
                L<sub>q</sub> = <strong>${lq.toFixed(2)} customers</strong>
            </div>
            <div>
                <strong>Additional Metrics:</strong><br>
                W<sub>s</sub> = 1/(μ−λ) = 1/${m - l} = ${ws.toFixed(4)} hr = ${(ws * 60).toFixed(1)} min<br>
                L<sub>s</sub> = λ/(μ−λ) = ${l}/${m - l} = ${(l / (m - l)).toFixed(2)} customers
            </div>
        `);
            const ansEl = getEl('q-prac-ans');
            if (ansEl) ansEl.classList.add('show');
        }

        // Enhanced Queuing Sensitivity
        function genQSens() {
            const l = getVal('q-l'), m = getVal('q-m');

            let html = `<h4 style="margin-bottom:12px;font-size:0.88rem">Impact of Arrival Rate (λ) on System Performance</h4>`;
            html += '<table class="data-table"><thead><tr><th>λ</th><th>ρ</th><th>L<sub>q</sub></th><th>W<sub>s</sub> (min)</th><th>L<sub>s</sub></th><th>Status</th></tr></thead><tbody>';

            for (let step = -4; step <= 6; step += 2) {
                const nl = l + step;
                if (nl <= 0) continue;
                const rho = nl / m;
                const stable = rho < 1;
                const lq = stable ? (nl * nl) / (m * (m - nl)) : Infinity;
                const ws = stable ? (1 / (m - nl)) * 60 : Infinity;
                const ls = stable ? nl / (m - nl) : Infinity;

                html += `<tr${step === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${nl}/hr${step === 0 ? ' ←' : ''}</td>
                <td>${fmtPercent(rho)}</td>
                <td>${stable ? lq.toFixed(2) : '∞'}</td>
                <td>${stable ? ws.toFixed(1) : '∞'}</td>
                <td>${stable ? ls.toFixed(2) : '∞'}</td>
                <td class="${!stable ? 'danger-cell' : rho > 0.85 ? 'danger-cell' : 'highlight-cell'}">${!stable ? '🔴 Unstable' : rho > 0.85 ? '🟡 Congested' : '🟢 Stable'}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            html += `<div style="margin-top:16px;padding:12px;background:#fef3c7;border-radius:8px;font-size:0.82rem">
            <strong>💡 Key Insight:</strong> Queue length grows exponentially as ρ approaches 1.0. At ρ = 0.9, L<sub>q</sub> is 9× larger than at ρ = 0.5. Keep utilization below 85% for acceptable wait times.
        </div>`;

            setHTML('q-sens-result', html);
        }

        function compareQScen() {
            const l1 = getVal('cmp-q-l1'), m1 = getVal('cmp-q-m1');
            const l2 = getVal('cmp-q-l2'), m2 = getVal('cmp-q-m2');

            const ok1 = l1 < m1, ok2 = l2 < m2;
            const lq1 = ok1 ? (l1 * l1) / (m1 * (m1 - l1)) : Infinity;
            const lq2 = ok2 ? (l2 * l2) / (m2 * (m2 - l2)) : Infinity;
            const ws1 = ok1 ? (1 / (m1 - l1)) * 60 : Infinity;
            const ws2 = ok2 ? (1 / (m2 - l2)) * 60 : Infinity;
            const rho1 = l1 / m1, rho2 = l2 / m2;

            setText('cmp-q-lq1', ok1 ? lq1.toFixed(2) : '∞');
            setText('cmp-q-lq2', ok2 ? lq2.toFixed(2) : '∞');

            const improvement = ok1 && ok2 ? ((lq1 - lq2) / lq1 * 100) : 0;

            setHTML('cmp-q-text', `
            <strong>Queue Length:</strong> A = ${ok1 ? lq1.toFixed(2) : '∞'} | B = ${ok2 ? lq2.toFixed(2) : '∞'} customers<br>
            <strong>Wait Time:</strong> A = ${ok1 ? ws1.toFixed(1) : '∞'} | B = ${ok2 ? ws2.toFixed(1) : '∞'} minutes<br>
            <strong>Utilization:</strong> A = ${fmtPercent(rho1)} | B = ${fmtPercent(rho2)}<br>
            ${ok1 && ok2 ? `<strong>Improvement:</strong> System B reduces queue by ${Math.abs(improvement).toFixed(1)}%` : ''}
        `);

            const resultEl = getEl('cmp-q-result');
            if (resultEl) resultEl.style.display = 'flex';
        }

        // ============================================================
        // SQC MODULE — Enhanced X-bar and R Charts with pattern detection
        // ============================================================
        let sqcD = [10, 10.5, 9.5, 10, 11, 10, 9.5, 10.5];
        let sqcR = [2, 2.5, 1.5, 2, 3, 2, 1.5, 2.5];

        const A2 = 0.577, D3 = 0, D4 = 2.114; // For n=5

        function updSQC() {
            if (sqcD.length === 0) return;

            const mean = sqcD.reduce((a, b) => a + b, 0) / sqcD.length;
            const rBar = sqcR.reduce((a, b) => a + b, 0) / sqcR.length;

            const uclX = mean + A2 * rBar;
            const lclX = mean - A2 * rBar;
            const uclR = D4 * rBar;
            const lclR = D3 * rBar;

            // Scaling functions for SVG
            const xRange = { min: Math.min(lclX - 1, ...sqcD), max: Math.max(uclX + 1, ...sqcD) };
            const rRange = { min: 0, max: Math.max(uclR + 1, ...sqcR) };

            const syX = v => 170 - ((v - xRange.min) / (xRange.max - xRange.min)) * 150;
            const syR = v => 170 - (v / rRange.max) * 150;

            // Update X-bar chart lines
            const setLineY = (id, y) => {
                const el = getEl(id);
                if (el) { el.setAttribute('y1', y); el.setAttribute('y2', y); }
            };

            setLineY('sqc-ucl', syX(uclX));
            setLineY('sqc-cl', syX(mean));
            setLineY('sqc-lcl', syX(lclX));
            setLineY('sqc-r-ucl', syR(uclR));
            setLineY('sqc-r-cl', syR(rBar));
            setLineY('sqc-r-lcl', syR(lclR));

            // Plot X-bar points
            const ptsX = sqcD.map((d, i) => `${50 + (i / Math.max(1, sqcD.length - 1)) * 530},${syX(d)}`).join(' ');
            const lineX = getEl('sqc-line');
            if (lineX) lineX.setAttribute('points', ptsX);

            // Plot R points
            const ptsR = sqcR.map((d, i) => `${50 + (i / Math.max(1, sqcR.length - 1)) * 530},${syR(d)}`).join(' ');
            const lineR = getEl('sqc-r-line');
            if (lineR) lineR.setAttribute('points', ptsR);

            // Draw data point circles
            const gX = getEl('sqc-pts');
            const gR = getEl('sqc-r-pts');
            if (gX) gX.innerHTML = '';
            if (gR) gR.innerHTML = '';

            let oocX = false, oocR = false;
            let oocDetails = [];

            // Western Electric Rules detection
            let consecutiveAbove = 0, consecutiveBelow = 0;
            let trendUp = 0, trendDown = 0;

            sqcD.forEach((d, i) => {
                const x = 50 + (i / Math.max(1, sqcD.length - 1)) * 530;
                const y = syX(d);
                const bad = d > uclX || d < lclX;
                if (bad) {
                    oocX = true;
                    oocDetails.push(`Sample ${i + 1}: X̄ = ${d.toFixed(2)} (${d > uclX ? 'above UCL' : 'below LCL'})`);
                }

                // Track consecutive points above/below center
                if (d > mean) { consecutiveAbove++; consecutiveBelow = 0; }
                else { consecutiveBelow++; consecutiveAbove = 0; }
                if (consecutiveAbove >= 8 || consecutiveBelow >= 8) {
                    oocX = true;
                    oocDetails.push(`8+ consecutive points ${consecutiveAbove >= 8 ? 'above' : 'below'} center line`);
                }

                // Track trends
                if (i > 0) {
                    if (d > sqcD[i - 1]) { trendUp++; trendDown = 0; }
                    else { trendDown++; trendUp = 0; }
                    if (trendUp >= 6 || trendDown >= 6) {
                        oocX = true;
                        oocDetails.push(`6+ points in ${trendUp >= 6 ? 'upward' : 'downward'} trend`);
                    }
                }

                if (gX) {
                    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 4);
                    c.setAttribute('fill', bad ? '#ef4444' : '#6366f1');
                    if (bad) {
                        c.setAttribute('stroke', '#ef4444');
                        c.setAttribute('stroke-width', '2');
                        c.setAttribute('r', '6');
                    }
                    gX.appendChild(c);
                }
            });

            sqcR.forEach((d, i) => {
                const x = 50 + (i / Math.max(1, sqcR.length - 1)) * 530;
                const y = syR(d);
                const bad = d > uclR || d < lclR;
                if (bad) {
                    oocR = true;
                    oocDetails.push(`Sample ${i + 1}: R = ${d.toFixed(2)} (${d > uclR ? 'above UCL' : 'below LCL'})`);
                }

                if (gR) {
                    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 4);
                    c.setAttribute('fill', bad ? '#ef4444' : '#f59e0b');
                    if (bad) {
                        c.setAttribute('stroke', '#ef4444');
                        c.setAttribute('stroke-width', '2');
                        c.setAttribute('r', '6');
                    }
                    gR.appendChild(c);
                }
            });

            // Update alert display
            const alertBox = getEl('sqc-ooc');
            const alertText = getEl('sqc-ooc-text');

            if (alertBox && alertText) {
                if (oocX || oocR) {
                    let msg = '<strong>⚠️ Out of Control!</strong> ';
                    if (oocX && oocR) msg += 'Both Mean and Range show assignable variation.';
                    else if (oocX) msg += 'Process Mean (X̄) has shifted.';
                    else msg += 'Process Variation (Range) has increased.';

                    // Show specific violations
                    const uniqueDetails = [...new Set(oocDetails)];
                    if (uniqueDetails.length > 0) {
                        msg += '<br><small>Violations: ' + uniqueDetails.slice(0, 3).join('; ') + '</small>';
                    }

                    alertText.innerHTML = msg;
                    alertBox.style.display = 'flex';
                    alertBox.className = 'alert alert-danger mt-4';
                } else {
                    alertText.innerHTML = '<strong>✅ In Control</strong> — All points within control limits. No patterns detected.';
                    alertBox.style.display = 'flex';
                    alertBox.className = 'alert alert-success mt-4';
                }
            }

            renderMath();
        }

        function addSQC(meanBias, rangeBias) {
            if (sqcD.length >= 25) {
                sqcD.shift();
                sqcR.shift();
            }
            const newMean = 10 + (Math.random() * 2 - 1) + meanBias;
            const newRange = Math.max(0.5, 2 + (Math.random() * 2 - 1) + rangeBias);
            sqcD.push(newMean);
            sqcR.push(newRange);
            updSQC();
        }

        function resetSQC() {
            sqcD = [10, 10.5, 9.5, 10, 11, 10, 9.5, 10.5];
            sqcR = [2, 2.5, 1.5, 2, 3, 2, 1.5, 2.5];
            updSQC();
        }

        // ============================================================
        // PROCESS CAPABILITY MODULE — Enhanced with PPM & sigma level
        // ============================================================
        function calcCap() {
            const usl = getVal('cpk-usl'), lsl = getVal('cpk-lsl');
            const mu = getVal('cpk-mean'), sig = getVal('cpk-sigma');

            if (sig <= 0) {
                showMsg('cap-status', 'Error: Standard deviation must be positive.', false);
                return;
            }

            const cp = (usl - lsl) / (6 * sig);
            const cpk = Math.min((usl - mu) / (3 * sig), (mu - lsl) / (3 * sig));
            const cpu = (usl - mu) / (3 * sig);
            const cpl = (mu - lsl) / (3 * sig);

            setText('cap-cp', cp.toFixed(2));
            setText('cap-cpk', cpk.toFixed(2));
            setText('cpk-cp', cp.toFixed(2));
            setText('cpk-cpk', cpk.toFixed(2));
            setText('cpk-cpu', cpu.toFixed(2));
            setText('cpk-cpl', cpl.toFixed(2));

            // Gauge animations
            const maxGauge = 204;
            const cpOff = maxGauge - (Math.min(Math.max(cp, 0), 2) / 2) * maxGauge;
            const cpkOff = maxGauge - (Math.min(Math.max(cpk, 0), 2) / 2) * maxGauge;

            const cpGauge = getEl('cp-gauge');
            const cpkGauge = getEl('cpk-gauge');
            if (cpGauge) cpGauge.style.strokeDashoffset = cpOff;
            if (cpkGauge) cpkGauge.style.strokeDashoffset = cpkOff;

            // Sigma level and PPM
            const sigLvl = cpk * 3;
            setText('cap-sigma', sigLvl.toFixed(1) + 'σ');

            // More accurate PPM calculation using normal CDF
            const ppm = cpkToPPM(cpk);
            setText('cap-ppm', ppm.toLocaleString());

            // Gauge colors based on capability
            const cpColor = cp >= 1.33 ? '#10b981' : cp >= 1.0 ? '#f59e0b' : '#ef4444';
            const cpkColor = cpk >= 1.33 ? '#10b981' : cpk >= 1.0 ? '#f59e0b' : '#ef4444';
            if (cpGauge) cpGauge.setAttribute('stroke', cpColor);
            if (cpkGauge) cpkGauge.setAttribute('stroke', cpkColor);

            // Status message with centering analysis
            const s = getEl('cap-status');
            if (s) {
                const centered = Math.abs(cp - cpk) < 0.05;
                const centerMsg = centered ? 'Process is well-centered.' :
                    `Process is off-center (Cp=${cp.toFixed(2)} vs Cpk=${cpk.toFixed(2)}). ${cpu < cpl ? 'Closer to USL' : 'Closer to LSL'}.`;

                if (cpk >= 1.33) {
                    s.className = 'alert alert-success mt-4';
                    s.innerHTML = `<div class="alert-icon">✅</div><div><strong>Excellent</strong> (Cpk ≥ 1.33) — ${ppm.toLocaleString()} PPM defective. ${centerMsg}</div>`;
                } else if (cpk >= 1.0) {
                    s.className = 'alert alert-warning mt-4';
                    s.innerHTML = `<div class="alert-icon">⚠️</div><div><strong>Marginally Capable</strong> (1.0 ≤ Cpk < 1.33) — ${ppm.toLocaleString()} PPM. ${centerMsg} Reduce σ or re-center process.</div>`;
                } else {
                    s.className = 'alert alert-danger mt-4';
                    s.innerHTML = `<div class="alert-icon">🔴</div><div><strong>Not Capable</strong> (Cpk < 1.0) — ${ppm.toLocaleString()} PPM. ${centerMsg} Immediate improvement needed.</div>`;
                }
            }
        }

        // ============================================================
        // CENTROID MODULE — Enhanced with Dynamic SVG Map & Distances
        // ============================================================
        function calcCent() {
            const ax = getVal('c-ax'), ay = getVal('c-ay'), av = getVal('c-av');
            const bx = getVal('c-bx'), by = getVal('c-by'), bv = getVal('c-bv');
            const cx = getVal('c-cx'), cy = getVal('c-cy'), cv = getVal('c-cv');

            const tv = av + bv + cv;
            if (tv === 0) return;

            // Calculate Centroid Coordinates
            const rx = (ax * av + bx * bv + cx * cv) / tv;
            const ry = (ay * av + by * bv + cy * cv) / tv;

            setText('c-rx', rx.toFixed(1));
            setText('c-ry', ry.toFixed(1));

            // --- 1. Distance & Load-Distance (Cost) Calculations ---
            const distA = Math.sqrt(Math.pow(rx - ax, 2) + Math.pow(ry - ay, 2));
            const distB = Math.sqrt(Math.pow(rx - bx, 2) + Math.pow(ry - by, 2));
            const distC = Math.sqrt(Math.pow(rx - cx, 2) + Math.pow(ry - cy, 2));

            const costA = av * distA;
            const costB = bv * distB;
            const costC = cv * distC;
            const totalCost = costA + costB + costC;

            // Inject results table
            let distSummary = getEl('c-dist-summary');
            if (!distSummary) {
                const grid = getEl('c-rx').closest('.grid-2');
                if (grid) {
                    distSummary = document.createElement('div');
                    distSummary.id = 'c-dist-summary';
                    distSummary.style.gridColumn = '1 / -1';
                    distSummary.className = 'mt-4';
                    grid.parentNode.insertBefore(distSummary, grid.nextSibling);
                }
            }

            if (distSummary) {
                distSummary.innerHTML = `
            <h4 style="font-size: 0.85rem; margin-bottom: 8px; color: var(--text-secondary);">Load-Distance Analysis</h4>
            <table class="data-table">
                <thead>
                    <tr><th>To Location</th><th>Distance</th><th>Volume</th><th>Load-Distance (Cost)</th></tr>
                </thead>
                <tbody>
                    <tr><td>A</td><td>${distA.toFixed(1)}</td><td>${av}</td><td>${costA.toFixed(0)}</td></tr>
                    <tr><td>B</td><td>${distB.toFixed(1)}</td><td>${bv}</td><td>${costB.toFixed(0)}</td></tr>
                    <tr><td>C</td><td>${distC.toFixed(1)}</td><td>${cv}</td><td>${costC.toFixed(0)}</td></tr>
                    <tr style="font-weight:bold; background:var(--bg-secondary)">
                        <td colspan="3" style="text-align:right">Total System Cost:</td>
                        <td class="highlight-cell">${totalCost.toFixed(0)}</td>
                    </tr>
                </tbody>
            </table>
        `;
            }

            // --- 2. Dynamic SVG Map Rendering ---
            const svg = getEl('centroid-svg');
            if (!svg) return;

            // Determine bounds for dynamic scaling (add 20% padding)
            const minX = Math.min(ax, bx, cx, rx);
            const maxX = Math.max(ax, bx, cx, rx);
            const minY = Math.min(ay, by, cy, ry);
            const maxY = Math.max(ay, by, cy, ry);

            const rangeX = Math.max(maxX - minX, 10); // Prevent division by zero
            const rangeY = Math.max(maxY - minY, 10);

            const vMinX = minX - rangeX * 0.2;
            const vMaxX = maxX + rangeX * 0.2;
            const vMinY = minY - rangeY * 0.2;
            const vMaxY = maxY + rangeY * 0.2;

            const vWidth = vMaxX - vMinX;
            const vHeight = vMaxY - vMinY;

            // Internal SVG resolution
            const svgW = 800;
            const svgH = 500;
            svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`);

            // Mapping functions (Note: SVG Y-axis goes down, so we invert it)
            const mapX = (x) => ((x - vMinX) / vWidth) * svgW;
            const mapY = (y) => svgH - (((y - vMinY) / vHeight) * svgH);

            // Calculate relative bubble sizes based on volume
            const maxV = Math.max(av, bv, cv);
            // Radius scales from 15px to 45px based on square root of volume (area proportional to volume)
            const getRadius = (v) => Math.max(15, (Math.sqrt(v) / Math.sqrt(maxV)) * 45);

            const pts = [
                { id: 'A', x: ax, y: ay, v: av, color: '#3b82f6' }, // Blue
                { id: 'B', x: bx, y: by, v: bv, color: '#10b981' }, // Green
                { id: 'C', x: cx, y: cy, v: cv, color: '#f59e0b' }  // Orange
            ];

            let svgContent = '';

            // Draw Axes if 0 is within the view
            if (vMinX <= 0 && vMaxX >= 0) {
                svgContent += `<line x1="${mapX(0)}" y1="0" x2="${mapX(0)}" y2="${svgH}" stroke="#cbd5e1" stroke-width="2" />`;
            }
            if (vMinY <= 0 && vMaxY >= 0) {
                svgContent += `<line x1="0" y1="${mapY(0)}" x2="${svgW}" y2="${mapY(0)}" stroke="#cbd5e1" stroke-width="2" />`;
            }

            // Draw connecting lines (spokes) from centroid to facilities
            pts.forEach(p => {
                svgContent += `<line x1="${mapX(rx)}" y1="${mapY(ry)}" x2="${mapX(p.x)}" y2="${mapY(p.y)}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,6" />`;
            });

            // Draw facility bubbles
            pts.forEach(p => {
                const r = getRadius(p.v);
                svgContent += `
            <!-- Outer Volume Bubble -->
            <circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="${r}" fill="${p.color}" fill-opacity="0.15" stroke="${p.color}" stroke-width="2" />
            <!-- Center Point -->
            <circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="5" fill="${p.color}" />
            <!-- Labels -->
            <text x="${mapX(p.x)}" y="${mapY(p.y) - r - 8}" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">${p.id}</text>
            <text x="${mapX(p.x)}" y="${mapY(p.y) + r + 18}" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#64748b">Vol: ${p.v}</text>
        `;
            });

            // Draw Centroid Marker
            svgContent += `
        <!-- Pulsing/Target effect for centroid -->
        <circle cx="${mapX(rx)}" cy="${mapY(ry)}" r="20" fill="none" stroke="#ef4444" stroke-width="2" stroke-opacity="0.5" />
        <circle cx="${mapX(rx)}" cy="${mapY(ry)}" r="8" fill="#ef4444" />
        <text x="${mapX(rx)}" y="${mapY(ry) - 28}" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ef4444">Centroid</text>
        <text x="${mapX(rx)}" y="${mapY(ry) + 32}" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">(${rx.toFixed(1)}, ${ry.toFixed(1)})</text>
    `;

            svg.innerHTML = svgContent;
        }

        // ============================================================
        // TRANSPORTATION MODULE — Enhanced NW Corner with cost breakdown
        // ============================================================
        function solveTr() {
            const s = [getVal('tr-sa'), getVal('tr-sb'), getVal('tr-sc')];
            const d = [getVal('tr-d1'), getVal('tr-d2'), getVal('tr-d3')];
            const c = [
                [getVal('tr-a1'), getVal('tr-a2'), getVal('tr-a3')],
                [getVal('tr-b1'), getVal('tr-b2'), getVal('tr-b3')],
                [getVal('tr-c1'), getVal('tr-c2'), getVal('tr-c3')]
            ];

            // Check supply-demand balance
            const totalSupply = s.reduce((a, b) => a + b, 0);
            const totalDemand = d.reduce((a, b) => a + b, 0);

            // Update total value display in the table
            setText('tr-total-val', Math.max(totalSupply, totalDemand));

            // Handle Balance Alert UI
            const alertBox = getEl('tr-balance-alert');
            const alertText = getEl('tr-balance-text');
            if (alertBox && alertText) {
                if (totalSupply !== totalDemand) {
                    alertBox.style.display = 'flex';
                    alertBox.className = 'alert alert-warning mb-4';
                    const diff = Math.abs(totalSupply - totalDemand);
                    const type = totalSupply > totalDemand ? 'Excess Supply' : 'Excess Demand';
                    const impact = totalSupply > totalDemand ? 'supply unused' : 'demand unmet';
                    alertText.innerHTML = `<strong>Unbalanced Problem:</strong> ${type} of ${diff} units. NW Corner will leave some ${impact}.`;
                } else {
                    alertBox.style.display = 'none';
                }
            }

            let ss = [...s], dd = [...d], tc = 0;
            let i = 0, j = 0;
            let allocations = [];

            // Northwest Corner Method Algorithm
            while (i < 3 && j < 3) {
                const q = Math.min(ss[i], dd[j]);
                if (q > 0) {
                    tc += q * c[i][j];
                    allocations.push({
                        from: `Source ${i + 1}`,
                        to: `Destination ${j + 1}`,
                        qty: q,
                        cost: c[i][j],
                        total: q * c[i][j]
                    });
                }
                ss[i] -= q;
                dd[j] -= q;
                if (ss[i] === 0) i++;
                if (dd[j] === 0) j++;
            }

            // Update Total Cost Metric
            setText('tr-cost', fmtCurrency(tc));

            // Populate the Shipping Plan (Allocations) Table
            const tbody = getEl('tr-allocation-body');
            const resultsDiv = getEl('tr-allocation-results');

            if (tbody && resultsDiv) {
                tbody.innerHTML = '';
                allocations.forEach(alloc => {
                    tbody.innerHTML += `<tr>
                <td><strong>${alloc.from}</strong></td>
                <td><strong>${alloc.to}</strong></td>
                <td class="highlight-cell">${alloc.qty} units</td>
                <td>$${alloc.cost}</td>
                <td>$${alloc.total.toLocaleString()}</td>
            </tr>`;
                });

                // Reveal the results section
                resultsDiv.style.display = 'block';
            }
        }

        // ============================================================
        // FORECASTING MODULE — Enhanced with trend & accuracy metrics
        // ============================================================
        let fcM = 'es';
        const actuals = [50, 52, 49, 55, 58, 60, 65, 63, 68, 70];

        function setFC(m) {
            fcM = m;
            const esBtn = getEl('fc-es'), maBtn = getEl('fc-ma');
            if (esBtn) esBtn.classList.toggle('active', m === 'es');
            if (maBtn) maBtn.classList.toggle('active', m === 'ma');

            const agEl = getEl('fc-ag'), ngEl = getEl('fc-ng');
            if (agEl) agEl.style.display = m === 'es' ? 'block' : 'none';
            if (ngEl) ngEl.style.display = m === 'ma' ? 'block' : 'none';
            updFC();
        }

        function updFC() {
            const alpha = getVal('fc-a') / 100;
            const n = getVal('fc-n');

            setText('fc-a-v', alpha.toFixed(2));
            setText('fc-n-v', n);

            let fc = [], err = [], signedErr = [];

            if (fcM === 'es') {
                let f = actuals[0];
                fc.push(f);
                for (let i = 1; i < actuals.length; i++) {
                    f = f + alpha * (actuals[i - 1] - f);
                    fc.push(f);
                    err.push(Math.abs(actuals[i] - f));
                    signedErr.push(actuals[i] - f);
                }
            } else {
                for (let i = 0; i < actuals.length; i++) {
                    if (i < n) {
                        fc.push(actuals[0]);
                        if (i > 0) {
                            err.push(Math.abs(actuals[i] - actuals[0]));
                            signedErr.push(actuals[i] - actuals[0]);
                        }
                    } else {
                        let s = 0;
                        for (let j = i - n; j < i; j++) s += actuals[j];
                        const f = s / n;
                        fc.push(f);
                        err.push(Math.abs(actuals[i] - f));
                        signedErr.push(actuals[i] - f);
                    }
                }
            }

            // Calculate accuracy metrics
            const mad = err.length > 0 ? err.reduce((a, b) => a + b, 0) / err.length : 0;
            const mse = err.length > 0 ? err.reduce((a, b) => a + b * b, 0) / err.length : 0;
            const bias = signedErr.length > 0 ? signedErr.reduce((a, b) => a + b, 0) / signedErr.length : 0;
            const rsfe = signedErr.reduce((a, b) => a + b, 0);
            const ts = mad !== 0 ? rsfe / mad : 0;

            setText('fc-mad', mad.toFixed(2));

            // Draw chart
            const sx = i => 40 + (i / (actuals.length - 1)) * 340;
            const minVal = Math.min(...actuals, ...fc) - 5;
            const maxVal = Math.max(...actuals, ...fc) + 5;
            const sy = v => 160 - ((v - minVal) / (maxVal - minVal)) * 140;

            const alLine = getEl('fc-al');
            const flLine = getEl('fc-fl');
            if (alLine) alLine.setAttribute('points', actuals.map((v, i) => `${sx(i)},${sy(v)}`).join(' '));
            if (flLine) flLine.setAttribute('points', fc.map((v, i) => `${sx(i)},${sy(v)}`).join(' '));
        }

        // ============================================================
        // AGGREGATE PLANNING MODULE — Enhanced with detailed period breakdown
        // ============================================================
        function calcAgg() {
            // 1. Get Inputs
            const d = [getVal('ag-q1'), getVal('ag-q2'), getVal('ag-q3'), getVal('ag-q4')];
            const rc = getVal('ag-rc');       // Regular production cost per unit
            const hc = getVal('ag-hc');       // Holding cost per unit per period
            const hf = getVal('ag-hf');       // Cost to hire or fire one worker
            const upw = getVal('ag-upw') || 10; // Units produced per worker per period
            const initWorkers = getVal('ag-iw') || 120; // Starting workforce

            const totalDemand = d.reduce((a, b) => a + b, 0);

            // ==========================================
            // CHASE STRATEGY CALCULATION
            // ==========================================
            let chaseTotal = 0;
            let currentWorkers = initWorkers;
            let chaseHTML = '';

            for (let i = 0; i < d.length; i++) {
                const prod = d[i]; // Match demand exactly
                const reqWorkers = Math.ceil(prod / upw);
                const workerChange = reqWorkers - currentWorkers;

                const hfCost = Math.abs(workerChange) * hf;
                const prodCost = prod * rc;
                const periodCost = prodCost + hfCost;

                chaseTotal += periodCost;

                // Format the Hire/Fire display
                let hfDisplay = workerChange === 0 ? '-' :
                    workerChange > 0 ? `<span style="color:var(--success)">+${workerChange}</span>` :
                        `<span style="color:var(--danger)">${workerChange}</span>`;

                chaseHTML += `<tr>
            <td><strong>Q${i + 1}</strong></td>
            <td>${d[i]}</td>
            <td class="highlight-cell">${prod}</td>
            <td>${reqWorkers}</td>
            <td>${hfDisplay}</td>
            <td>${fmtCurrency(periodCost)}</td>
        </tr>`;

                currentWorkers = reqWorkers;
            }

            // ==========================================
            // LEVEL STRATEGY CALCULATION
            // ==========================================
            const avgProd = Math.ceil(totalDemand / d.length);
            const levelWorkers = Math.ceil(avgProd / upw);
            let levelTotal = 0;
            let inv = 0;
            let levelHTML = '';

            // Initial adjustment to reach the level workforce
            const initialLevelChange = levelWorkers - initWorkers;
            const initialLevelHfCost = Math.abs(initialLevelChange) * hf;
            levelTotal += initialLevelHfCost;

            for (let i = 0; i < d.length; i++) {
                inv += avgProd - d[i]; // Add production, subtract demand

                // Calculate holding cost (assuming no backorder cost for simplicity, just 0 if negative)
                const holdCost = inv > 0 ? inv * hc : 0;
                const prodCost = avgProd * rc;
                const periodCost = prodCost + holdCost;

                levelTotal += periodCost;

                levelHTML += `<tr>
            <td><strong>Q${i + 1}</strong></td>
            <td>${d[i]}</td>
            <td class="highlight-cell">${avgProd}</td>
            <td class="${inv < 0 ? 'danger-cell' : ''}">${inv}</td>
            <td>${fmtCurrency(holdCost)}</td>
            <td>${fmtCurrency(periodCost)}</td>
        </tr>`;
            }

            // ==========================================
            // UPDATE DOM
            // ==========================================
            setText('ag-chase-total', fmtCurrency(chaseTotal));
            setHTML('ag-chase-body', chaseHTML);

            setText('ag-level-total', fmtCurrency(levelTotal));
            setHTML('ag-level-body', levelHTML);

            // Recommendation Logic
            const recEl = getEl('ag-recommendation');
            if (recEl) {
                recEl.style.display = 'flex';
                const diff = Math.abs(chaseTotal - levelTotal);

                if (chaseTotal < levelTotal) {
                    recEl.className = 'alert alert-success mt-4';
                    recEl.innerHTML = `<div class="alert-icon">✅</div><div><strong>Recommendation: Chase Strategy</strong> is cheaper by ${fmtCurrency(diff)}. It avoids high inventory holding costs, though it requires workforce fluctuations.</div>`;
                } else if (levelTotal < chaseTotal) {
                    recEl.className = 'alert alert-success mt-4';
                    recEl.innerHTML = `<div class="alert-icon">✅</div><div><strong>Recommendation: Level Strategy</strong> is cheaper by ${fmtCurrency(diff)}. It avoids expensive hiring/firing costs by utilizing inventory to absorb demand fluctuations.</div>`;
                } else {
                    recEl.className = 'alert alert-info mt-4';
                    recEl.innerHTML = `<div class="alert-icon">⚖️</div><div><strong>Tie:</strong> Both strategies cost the same. Choose Level for workforce stability, or Chase to minimize physical inventory.</div>`;
                }
            }
        }

        // ============================================================
        // EOQ MODULE — Enhanced with complete inventory analysis
        // ============================================================
        function updEOQ() {
            const eD = getEl('eoq-d');
            if (!eD) return;
            const d = +eD.value, s = getVal('eoq-s'), h = getVal('eoq-h');

            setText('eoq-d-v', d);
            setText('eoq-s-v', s);
            setText('eoq-h-v', h);

            if (h <= 0 || d <= 0) return;

            const q = Math.sqrt(2 * d * s / h);
            const tc = (d / q) * s + (q / 2) * h;
            const orderingCost = (d / q) * s;
            const holdingCost = (q / 2) * h;
            const ordersPerYear = d / q;
            const orderInterval = 365 / ordersPerYear;

            // Update formula displays
            setHTML('eoq-q-f', `\\[Q^* = \\sqrt{\\frac{2 \\times ${d} \\times ${s}}{${h}}}\\]`);
            setText('eoq-q-r', `=${Math.round(q)}`);
            setHTML('eoq-tc-f', `\\[TC = \\left(\\frac{${d}}{${Math.round(q)}}\\right)${s} + \\left(\\frac{${Math.round(q)}}{2}\\right)${h}\\]`);
            setText('eoq-tc-r', `=${fmtCurrency(tc)}`);

            setText('eoq-q-m', Math.round(q));
            setText('eoq-tc-m', fmtCurrency(tc));
            setText('eoq-or-m', ordersPerYear.toFixed(1));

            renderMath();
        }

        // EOQ Practice Problems
        let eoqProb = {};

        function genEoqPractice() {
            const d = (10 + Math.floor(Math.random() * 40)) * 100;
            const s = 10 + Math.floor(Math.random() * 90);
            const h = 2 + Math.floor(Math.random() * 8);
            const q = Math.round(Math.sqrt(2 * d * s / h));
            const tc = Math.round((d / q) * s + (q / 2) * h);
            eoqProb = { d, s, h, q, tc };

            const qEl = getEl('eoq-prac-q');
            if (!qEl) return;
            qEl.innerHTML = `A company has <strong>Annual Demand = ${d.toLocaleString()} units</strong>, <strong>Order Cost = $${s}</strong>, <strong>Holding Cost = $${h}/unit/year</strong>.<br>Calculate the optimal Order Quantity (Q*).`;

            const input = getEl('eoq-prac-ans-input');
            if (input) input.value = '';
            const ansEl = getEl('eoq-prac-ans');
            if (ansEl) ansEl.classList.remove('show');
            const msgEl = getEl('eoq-prac-msg');
            if (msgEl) msgEl.style.display = 'none';
        }

        function checkEoqAns() {
            const user = +getEl('eoq-prac-ans-input')?.value;
            if (!user) {
                showMsg('eoq-prac-msg', 'Please enter your answer.', false);
                return;
            }
            if (Math.abs(user - eoqProb.q) <= 3) {
                showMsg('eoq-prac-msg', `🎉 <strong>Correct!</strong> Q* = ${eoqProb.q} units. Total Cost = ${fmtCurrency(eoqProb.tc)}/year.`, true);
            } else {
                showMsg('eoq-prac-msg', `Not quite (your answer: ${user}). Try again or click Show Solution.`, false);
            }
        }

        function showEoqSol() {
            const { d, s, h, q, tc } = eoqProb;
            const inside = 2 * d * s / h;
            setHTML('eoq-prac-sol', `
            <div style="margin-bottom:8px">
                <strong>Step 1: Apply EOQ Formula</strong><br>
                Q* = √(2DS/H) = √(2 × ${d.toLocaleString()} × ${s} / ${h})<br>
                Q* = √(${inside.toLocaleString()}) = <strong>${q} units</strong>
            </div>
            <div style="margin-bottom:8px">
                <strong>Step 2: Verify with Total Cost</strong><br>
                Ordering Cost = (D/Q*)S = (${d}/${q}) × ${s} = ${fmtCurrency((d / q) * s)}<br>
                Holding Cost = (Q*/2)H = (${q}/2) × ${h} = ${fmtCurrency((q / 2) * h)}<br>
                TC = ${fmtCurrency(tc)} (Note: Ordering ≈ Holding at optimum ✓)
            </div>
            <div>
                <strong>Step 3: Operational Metrics</strong><br>
                Orders/Year = D/Q* = ${d}/${q} = ${(d / q).toFixed(1)}<br>
                Order Interval = ${Math.round(365 / (d / q))} days
            </div>
        `);
            const ansEl = getEl('eoq-prac-ans');
            if (ansEl) ansEl.classList.add('show');
        }

        // EOQ Sensitivity Analysis
        function genEoqSens() {
            const d = getVal('eoq-d'), s = getVal('eoq-s'), h = getVal('eoq-h');
            const baseQ = Math.sqrt(2 * d * s / h);
            const baseTC = (d / baseQ) * s + (baseQ / 2) * h;

            let html = `<h4 style="margin-bottom:12px;font-size:0.88rem">EOQ Sensitivity to Demand Changes</h4>`;
            html += '<table class="data-table"><thead><tr><th>Demand Δ</th><th>Demand</th><th>Q*</th><th>TC</th><th>TC Change</th><th>Orders/Yr</th></tr></thead><tbody>';

            for (let pct = -20; pct <= 20; pct += 10) {
                const nd = d * (1 + pct / 100);
                const nq = Math.sqrt(2 * nd * s / h);
                const ntc = (nd / nq) * s + (nq / 2) * h;
                const tcCh = ntc - baseTC;

                html += `<tr${pct === 0 ? ' style="font-weight:700;background:var(--bg-secondary)"' : ''}>
                <td>${pct > 0 ? '+' : ''}${pct}%${pct === 0 ? ' ←' : ''}</td>
                <td>${nd.toLocaleString()}</td>
                <td>${Math.round(nq)}</td>
                <td>${fmtCurrency(ntc)}</td>
                <td class="${tcCh > 0 ? 'danger-cell' : 'highlight-cell'}">${tcCh >= 0 ? '+' : ''}${fmtCurrency(tcCh)}</td>
                <td>${(nd / nq).toFixed(1)}</td>
            </tr>`;
            }
            html += '</tbody></table>';

            html += `<div style="margin-top:16px;padding:12px;background:#fef3c7;border-radius:8px;font-size:0.82rem">
            <strong>💡 Robustness:</strong> EOQ is robust — a ±20% change in demand only changes Q* by ~±10% (square root effect) and TC by even less. The total cost curve is flat near Q*.
        </div>`;

            setHTML('eoq-sens-result', html);
        }

        function compareEoqScen() {
            const d1 = getVal('cmp-eoq-d1'), s1 = getVal('cmp-eoq-s1'), h1 = getVal('cmp-eoq-h1');
            const d2 = getVal('cmp-eoq-d2'), s2 = getVal('cmp-eoq-s2'), h2 = getVal('cmp-eoq-h2');

            const q1 = Math.sqrt(2 * d1 * s1 / h1), tc1 = (d1 / q1) * s1 + (q1 / 2) * h1;
            const q2 = Math.sqrt(2 * d2 * s2 / h2), tc2 = (d2 / q2) * s2 + (q2 / 2) * h2;

            setText('cmp-eoq-tc1', fmtCurrency(tc1));
            setText('cmp-eoq-tc2', fmtCurrency(tc2));

            const diff = tc2 - tc1;
            const savings = Math.abs(diff);

            setHTML('cmp-eoq-text', `
            <strong>Q*:</strong> A = ${Math.round(q1)} units | B = ${Math.round(q2)} units<br>
            <strong>Total Cost:</strong> A = ${fmtCurrency(tc1)} | B = ${fmtCurrency(tc2)}<br>
            <strong>Difference:</strong> Scenario B is <strong>${fmtCurrency(savings)} ${diff > 0 ? 'more expensive' : 'cheaper'}</strong> (${Math.abs(diff / tc1 * 100).toFixed(1)}% ${diff > 0 ? 'increase' : 'savings'}).
        `);

            const resultEl = getEl('cmp-eoq-result');
            if (resultEl) resultEl.style.display = 'flex';
        }

        // ============================================================
        // SAFETY STOCK MODULE — Enhanced with service level analysis
        // ============================================================
        function calcSS() {
            const d = getVal('ss-d'), sig = getVal('ss-sig');
            const lt = getVal('ss-lt'), z = +getEl('ss-z')?.value || 1.65;

            setText('ss-d-v', d);
            setText('ss-sig-v', sig);
            setText('ss-lt-v', lt);

            const slt = sig * Math.sqrt(lt);    // σ during lead time
            const ss = z * slt;                  // Safety stock
            const rop = d * lt + ss;             // Reorder point
            const demandDuringLT = d * lt;       // Expected demand during LT

            setHTML('ss-ss-f', `\\[SS = ${z} \\times ${slt.toFixed(1)}\\]`);
            setText('ss-ss-r', `=${Math.round(ss)}`);
            setHTML('ss-rop-f', `\\[ROP = ${d} \\times ${lt} + ${Math.round(ss)}\\]`);
            setText('ss-rop-r', `=${Math.round(rop)}`);

            setText('ss-ss-m', Math.round(ss));
            setText('ss-rop-m', Math.round(rop));

            renderMath();
        }

        // ============================================================
        // MRP MODULE — Enhanced with Lot Sizing (L4L and FOQ)
        // ============================================================
        function toggleLotSize() {
            const rule = document.getElementById('mrp-lot-rule').value;
            const input = document.getElementById('mrp-lot-size');
            // Enable the lot size input only if Fixed Order Quantity is selected
            input.disabled = (rule === 'L4L');
            calcMRP();
        }

        function calcMRP() {
            const lt = getVal('mrp-lt');
            const inv = getVal('mrp-inv');
            const lotRule = document.getElementById('mrp-lot-rule').value;
            const lotSize = getVal('mrp-lot-size') || 1;

            // Hardcoded demand and scheduled receipts for the simulation
            const g = [50, 0, 100, 0, 150, 0]; // Gross Requirements
            const sr = [50, 0, 0, 0, 0, 0];    // Scheduled Receipts

            const oh = [], nr = [], prec = [], prel = [];
            let currentOH = inv;

            // Initialize arrays with zeros
            for (let i = 0; i < 6; i++) {
                prel[i] = 0;
                prec[i] = 0;
            }

            // MRP explosion logic period by period
            for (let i = 0; i < 6; i++) {
                // 1. Calculate Available inventory before new planned receipts
                let available = currentOH + sr[i];

                // 2. Calculate Net Requirement
                let net = Math.max(0, g[i] - available);
                nr.push(net);

                // 3. Determine Planned Order Receipts based on Lot Sizing Rule
                let receipt = 0;
                if (net > 0) {
                    if (lotRule === 'L4L') {
                        // Lot-for-Lot: Order exactly what is needed
                        receipt = net;
                    } else if (lotRule === 'FOQ') {
                        // Fixed Order Quantity: Order in multiples of the lot size
                        receipt = Math.ceil(net / lotSize) * lotSize;
                    }
                }
                prec[i] = receipt;

                // 4. Calculate ending Projected On-Hand inventory
                currentOH = available + receipt - g[i];
                oh.push(currentOH);

                // 5. Offset for Planned Order Release based on Lead Time
                const releasePeriod = i - lt;
                if (releasePeriod >= 0) {
                    prel[releasePeriod] = receipt;
                }
            }

            // Update the DOM table
            for (let i = 1; i <= 6; i++) {
                setText('m-oh' + i, oh[i - 1]);
                setText('m-nr' + i, nr[i - 1]);
                setText('m-pr' + i, prec[i - 1]); // Planned Order Receipts
                setText('m-po' + i, prel[i - 1]); // Planned Order Releases
            }
        }
        // ============================================================
        // SCHEDULING MODULE — Enhanced with comprehensive metrics
        // ============================================================
        let sRule = 'FCFS';

        function setSR(r) {
            sRule = r;
            ['FCFS', 'SPT', 'EDD', 'CR'].forEach(x => {
                const btn = getEl('sc-' + x.toLowerCase());
                if (btn) btn.classList.toggle('active', x === r);
            });
            updSch();
        }

        function updSch() {
            const today = getVal('sc-today') || 0;

            // Collect job data (5 jobs: A-E)
            const jobs = [
                { id: 'A', t: getVal('sc-at'), d: getVal('sc-ad') },
                { id: 'B', t: getVal('sc-bt'), d: getVal('sc-bd') },
                { id: 'C', t: getVal('sc-ct'), d: getVal('sc-cd') },
                { id: 'D', t: getVal('sc-dt'), d: getVal('sc-dd') },
                { id: 'E', t: getVal('sc-et'), d: getVal('sc-ed') }
            ];

            let s = [...jobs];

            // Apply sorting rule
            switch (sRule) {
                case 'SPT':
                    s.sort((a, b) => a.t - b.t);
                    break;
                case 'EDD':
                    s.sort((a, b) => a.d - b.d);
                    break;
                case 'CR':
                    s.sort((a, b) => {
                        const crA = a.t > 0 ? (a.d - today) / a.t : Infinity;
                        const crB = b.t > 0 ? (b.d - today) / b.t : Infinity;
                        return crA - crB;
                    });
                    break;
                // FCFS: keep original order
            }

            let f = 0, tf = 0, tt = 0, maxTardy = 0;
            const res = [];

            s.forEach((j, i) => {
                f += j.t;
                const td = Math.max(0, f - j.d);
                tf += f;
                tt += td;
                maxTardy = Math.max(maxTardy, td);

                // Calculate CR for display
                const cr = j.t > 0 ? ((j.d - today) / j.t) : Infinity;

                res.push({ ...j, f, td, seq: i + 1, cr });
            });

            const numJobs = jobs.length;
            const af = tf / numJobs;                    // Average flow time
            const at = tt / numJobs;                    // Average tardiness
            const total = f;                             // Makespan
            const avgJobsInSystem = tf / total;          // Average jobs in system (Little's Law)
            const utilization = jobs.reduce((a, b) => a + b.t, 0) / total * 100;

            setText('sc-flow', af.toFixed(2));
            setText('sc-tard', at.toFixed(2));

            // Gantt chart
            const g = getEl('sc-gantt');
            if (g) {
                g.innerHTML = '';
                const cols = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

                res.forEach((j, i) => {
                    const d = document.createElement('div');
                    d.className = 'gantt-segment';
                    d.style.width = (j.t / total * 100) + '%';
                    d.style.backgroundColor = cols[i % cols.length];
                    d.textContent = j.id + '(' + j.t + ')';
                    d.title = `Job ${j.id}: Process=${j.t}d, Complete=Day ${j.f}, Due=Day ${j.d}${j.td > 0 ? ', LATE by ' + j.td + 'd' : ''}`;
                    g.appendChild(d);
                });
            }

            setText('sc-total', 'Day ' + total);

            // Results table
            const tb = getEl('sc-tbody');
            if (tb) {
                tb.innerHTML = '';
                res.forEach(j => {
                    const crDisplay = sRule === 'CR' ? `<td>${j.cr === Infinity ? '∞' : j.cr.toFixed(2)}</td>` : '';
                    tb.innerHTML += `<tr>
                    <td>${j.seq}</td>
                    <td><strong>${j.id}</strong></td>
                    <td>${j.t}</td>
                    <td class="highlight-cell">${j.f}</td>
                    <td>${j.d}</td>
                    <td class="${j.td > 0 ? 'danger-cell' : ''}">${j.td}${j.td > 0 ? ' ⚠️' : ' ✓'}</td>
                </tr>`;
                });

                // Summary row
                tb.innerHTML += `<tr style="font-weight:700;background:var(--bg-secondary)">
                <td colspan="3">Averages / Totals</td>
                <td>${af.toFixed(1)}</td>
                <td>—</td>
                <td>${at.toFixed(1)}</td>
            </tr>`;
            }
        }

        // ============================================================
        // CANONICAL MODULE NAVIGATION SHELL
        // ============================================================
        window.OSCMCanonical = (function () {
            const registry = {
                "pert": { tabs: ["all", "simulator", "theory", "visuals", "practice", "sensitivity", "compare"] },
                "breakeven": { tabs: ["all", "simulator", "theory", "visuals", "practice", "sensitivity", "compare"] },
                "decision": { tabs: ["all", "simulator", "theory"] },
                "learning": { tabs: ["all", "simulator", "theory"] },
                "linebalance": { tabs: ["all", "simulator", "theory"] },
                "queuing": { tabs: ["all", "simulator", "theory", "visuals", "practice", "sensitivity", "compare"] },
                "littles": { tabs: ["all", "simulator", "theory", "visuals"] },
                "sqc": { tabs: ["all", "simulator", "theory", "visuals"] },
                "capability": { tabs: ["all", "simulator", "theory", "visuals"] },
                "centroid": { tabs: ["all", "simulator", "theory", "visuals"] },
                "transportation": { tabs: ["all", "simulator", "theory"] },
                "forecast": { tabs: ["all", "simulator", "theory", "visuals"] },
                "aggregate": { tabs: ["all", "simulator", "theory"] },
                "eoq": { tabs: ["all", "simulator", "theory", "practice", "sensitivity", "compare"] },
                "safetystock": { tabs: ["all", "simulator", "theory"] },
                "mrp": { tabs: ["all", "simulator", "theory", "visuals"] },
                "scheduling": { tabs: ["all", "simulator", "theory", "visuals"] },
                "dpmo": { tabs: ["all", "simulator", "theory"] },
                "fmea": { tabs: ["all", "simulator", "theory"] },
                "pareto": { tabs: ["all", "simulator", "theory"] },
                "fishbone": { tabs: ["all", "simulator", "theory"] },
                "factor": { tabs: ["all", "simulator", "theory"] },
                "crashing": { tabs: ["all", "simulator", "theory"] },
                "bom": { tabs: ["all", "simulator", "theory"] },
                "pokayoke": { tabs: ["all", "simulator", "theory"] },
                "practice": { tabs: ["all", "simulator", "theory"] },
                "distributions": { tabs: ["all", "simulator", "theory"] },
                "mms-lookup": { tabs: ["all", "simulator", "theory"] },
                "queue-cost": { tabs: ["all", "simulator", "theory"] },
                "newsvendor": { tabs: ["all", "simulator", "theory"] },
                "regression": { tabs: ["all", "simulator", "theory"] },
                "mrp-lotsizing": { tabs: ["all", "simulator", "theory"] },
                "risk": { tabs: ["all", "simulator", "theory"] },
                "ch1-practice": { tabs: ["all", "simulator", "theory"] }
            };

            function root(mid) { return document.querySelector(`[data-cmodule="${mid}"]`); }
            function shell(mid) { return document.getElementById(`canonical-${mid}`); }

            function sections(mid) {
                const r = root(mid);
                if (!r) return [];
                const main = r.querySelector('.main-content') || r;
                return Array.from(main.children).filter(el => el.matches && el.hasAttribute('data-canon-tags'));
            }

            function tagsOf(el) {
                return (el.getAttribute('data-canon-tags') || '').split(/\s+/).filter(Boolean);
            }

            function openView(mid, view, btn) {
                const all = sections(mid);
                const tabRoot = shell(mid);

                if (tabRoot) {
                    tabRoot.querySelectorAll('.canonical-tab').forEach(t => {
                        t.classList.toggle('active', t === btn || t.getAttribute('data-canonical-target') === view);
                    });
                }

                all.forEach(el => {
                    const tags = tagsOf(el);
                    const text = (el.textContent || '').toLowerCase();
                    const show = view === 'all' ||
                        tags.includes(view) ||
                        (view === 'practice' && text.includes('practice')) ||
                        (view === 'sensitivity' && text.includes('sensitivity')) ||
                        (view === 'compare' && text.includes('compare'));

                    el.classList.toggle('canonical-hidden', !show);
                    // Smooth transition
                    if (show) {
                        el.style.opacity = '0';
                        requestAnimationFrame(() => {
                            el.style.transition = 'opacity 0.3s ease';
                            el.style.opacity = '1';
                        });
                    }
                });

                renderMath();
            }

            function invoke(mid, action) {
                if (action === 'export') { exportModule(mid); return; }
                if (action === 'tutorial') { if (typeof openTutorial === 'function') openTutorial(); return; }
                if (action === 'practice') { openView(mid, 'practice'); return; }
                if (action === 'sensitivity') { openView(mid, 'sensitivity'); return; }
                if (action === 'compare') { openView(mid, 'compare'); return; }
                if (action === 'animation') { if (typeof toggleAnim === 'function') toggleAnim(); return; }
            }

            function init() {
                Object.keys(registry).forEach(mid => openView(mid, 'all'));
            }

            return { registry, openView, invoke, init };
        })();

        // ============================================================
        // INITIALIZATION SEQUENCE
        // ============================================================
        document.addEventListener('DOMContentLoaded', () => {
            enhanceAccessibility();

            // Safe event listener attachment
            const addL = (id, evt, fn) => {
                const el = document.getElementById(id);
                if (el) el.addEventListener(evt, fn);
            };

            const activeNav = document.querySelector('.nav-btn.active') || document.querySelector('.nav-btn');
            if (activeNav && !document.querySelector('.module.active')) {
                const initialModule = document.getElementById(activeNav.dataset.module + '-module');
                if (initialModule) initialModule.classList.add('active');
            }

            // PERT listeners
            addL('p-a', 'input', updPERT);
            addL('p-m', 'input', updPERT);
            addL('p-b', 'input', updPERT);

            // Break-Even listeners
            addL('be-fc', 'input', updBE);
            addL('be-p', 'input', updBE);
            addL('be-vc', 'input', updBE);

            // Decision Tree listeners
            addL('dt-p', 'input', updDT);
            addL('dt-v1', 'input', updDT);
            addL('dt-v2', 'input', updDT);
            addL('dt-v3', 'input', updDT);
            addL('dt-v4', 'input', updDT);

            // Learning Curve listeners
            addL('lc-k', 'input', updLC);
            addL('lc-b', 'input', updLC);

            // Line Balancing listeners
            addL('lb-prodtime', 'input', calcLineBalance);
            addL('lb-output', 'input', calcLineBalance);
            addL('lb-sumtask', 'input', calcLineBalance);
            addL('lb-stations', 'input', calcLineBalance);

            // Queuing listeners
            addL('q-l', 'input', updQ);
            addL('q-m', 'input', updQ);

            // Little's Law listeners
            addL('ll-r', 'input', updLL);
            addL('ll-t', 'input', updLL);

            // Forecasting listeners
            addL('fc-a', 'input', updFC);
            addL('fc-n', 'input', updFC);

            // EOQ listeners
            addL('eoq-d', 'input', updEOQ);
            addL('eoq-s', 'input', updEOQ);
            addL('eoq-h', 'input', updEOQ);

            // Safety Stock listeners
            addL('ss-d', 'input', calcSS);
            addL('ss-sig', 'input', calcSS);
            addL('ss-lt', 'input', calcSS);
            addL('ss-z', 'change', calcSS);

            // Run all initial calculations
            const initFunctions = [
                updPERT, updBE, updDT, updLC, calcLineBalance, updQ, updLL,
                updSQC, calcCap, calcCent, updFC, calcAgg, updEOQ,
                calcSS, calcMRP, updSch
            ];

            initFunctions.forEach(fn => {
                if (typeof fn === 'function') {
                    try { fn(); } catch (e) { console.warn('Init warning:', e.message); }
                }
            });

            // Consolidated patch initializers (3.2 + 3.3 + 3.4)
            const patchFunctions = [
                calcExponential, calcPoisson, buildLqTable, highlightLqTable,
                calcQueueCost, calcNewsvendor, buildRegTable, calcRegression, calcRisk,
                calcFMEA, calcDPMO, calcPareto, drawFishbone, calcFactorRating,
                calcCrash, calcBOM, buildPChart, buildCChart, buildZTable,
                calcTransport, calcWMA, calcHolts, calcSeasonal, buildTrackingSignal,
                calcConfig, calcPertVariance, calcTargetVolume, calcLeanImprovement,
                calcMMs
            ];
            patchFunctions.forEach(fn => {
                if (typeof fn === 'function') {
                    try { fn(); } catch (e) { console.warn('Patch init warning:', e.message); }
                }
            });

            // Generate starting practice problems
            const practiceFunctions = [genPractice, genBePractice, genQPractice, genEoqPractice];
            practiceFunctions.forEach(fn => {
                if (typeof fn === 'function') {
                    try { fn(); } catch (e) { console.warn('Practice init warning:', e.message); }
                }
            });

            // Initialize Canonical Shell
            if (window.OSCMCanonical) {
                try { window.OSCMCanonical.init(); } catch (e) { console.warn('Canonical init warning:', e.message); }
            }

            // Initial MathJax render with retry
            if (window.MathJax) {
                setTimeout(() => {
                    try { renderMath(); } catch (e) { console.warn('MathJax initial render warning:', e.message); }
                }, 200);
                // Second pass for any late-loading content
                setTimeout(() => {
                    try { renderMath(); } catch (e) { /* silent */ }
                }, 1000);
            }

            console.log('✅ OSCM Simulator v3.0 Enhanced Edition initialized successfully');
        });

        function enhanceAccessibility() {
            document.querySelectorAll('label').forEach((label, index) => {
                if (label.htmlFor) return;
                const control = label.parentElement?.querySelector('input, select, textarea');
                if (!control) return;
                if (!control.id) control.id = `auto-control-${index + 1}`;
                label.htmlFor = control.id;
            });

            document.querySelectorAll('input, select, textarea').forEach((control, index) => {
                if (control.getAttribute('aria-label')) return;
                const explicitLabel = control.id ? document.querySelector(`label[for="${control.id}"]`) : null;
                const cell = control.closest('td');
                const tableHeader = cell?.closest('table')?.querySelectorAll('th')?.[cell.cellIndex || 0]?.textContent?.trim();
                const fallback = explicitLabel?.textContent?.trim() || tableHeader || `Simulator input ${index + 1}`;
                control.setAttribute('aria-label', fallback.replace(/\s+/g, ' '));
            });

            document.querySelectorAll('button').forEach((button, index) => {
                if (button.getAttribute('aria-label')) return;
                const label = button.textContent?.trim() || button.title || `Simulator action ${index + 1}`;
                button.setAttribute('aria-label', label.replace(/\s+/g, ' '));
            });
        }
    /* ==========================================
       OSCM PATCH v3.0 CORE LOGIC
    ========================================== */

    function calcPertVariance() {
        const rows = document.querySelectorAll('#pert-var-table tbody tr');
        const totalVarEl = document.getElementById('pert-total-var');
        const pathSdEl = document.getElementById('pert-path-sd');
        if (!rows.length || !totalVarEl || !pathSdEl) return;
        let totalVar = 0;
        rows.forEach(row => {
            const a = parseFloat(row.cells[1].children[0].value) || 0;
            const m = parseFloat(row.cells[2].children[0].value) || 0;
            const b = parseFloat(row.cells[3].children[0].value) || 0;
            const te = (a + 4 * m + b) / 6;
            const sigma = (b - a) / 6;
            const v = sigma * sigma;
            row.cells[4].innerText = te.toFixed(2);
            row.cells[5].innerText = v.toFixed(3);
            totalVar += v;
        });
        totalVarEl.innerText = totalVar.toFixed(3);
        pathSdEl.innerText = Math.sqrt(totalVar).toFixed(3);
    }

    function calcTargetVolume() {
        const fixed = getVal('be-fc');
        const price = getVal('be-p');
        const variable = getVal('be-vc');
        const targetProfit = getVal('tv-profit');
        const denom = price - variable;
        if (denom <= 0) return;
        const q = (fixed + targetProfit) / denom;
        setText('tv-q-result', Math.ceil(q).toLocaleString());
        setText('tv-rev-result', '$' + (Math.ceil(q) * price).toLocaleString());
    }

    function calcCumulativeLC() {
        const k = parseFloat(document.getElementById('lc-k').value) || 100;
        const b = (parseFloat(document.getElementById('lc-b').value) || 80) / 100;
        const n = Math.log(b) / Math.log(2);
        const x = parseInt(document.getElementById('lc-target-unit').value) || 10;
        const unitTime = k * Math.pow(x, n);
        let totalTime = 0;
        for (let i = 1; i <= x; i++) totalTime += k * Math.pow(i, n);
        document.getElementById('lc-unit-time').innerText = unitTime.toFixed(1);
        document.getElementById('lc-cum-time').innerText = totalTime.toFixed(1);
        document.getElementById('lc-avg-time').innerText = (totalTime / x).toFixed(1);
    }

    function calcMMs() {
        const L = parseFloat(document.getElementById('mms-lambda').value) || 0;
        const M = parseFloat(document.getElementById('mms-mu').value) || 1;
        const s = parseInt(document.getElementById('mms-s').value) || 1;
        const rho = L / (s * M);
        if (rho >= 1) {
            document.getElementById('mms-lq').innerText = "Infinite";
            return;
        }
        function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
        let sum = 0;
        for (let n = 0; n < s; n++) {
            sum += Math.pow(L / M, n) / fact(n);
        }
        sum += (Math.pow(L / M, s) / (fact(s) * (1 - rho)));
        const p0 = 1 / sum;
        const lq = (p0 * Math.pow(L / M, s) * rho) / (fact(s) * Math.pow(1 - rho, 2));
        document.getElementById('mms-lq').innerText = lq.toFixed(3);
        document.getElementById('mms-wq').innerText = (lq / L).toFixed(3);
    }

    function calcFiniteQueue() {
        const N = parseInt(document.getElementById('fq-n').value) || 0;
        const M = parseFloat(document.getElementById('fq-m').value) || 1;
        const U = parseFloat(document.getElementById('fq-u').value) || 1;
        const X = M / (M + U);
        function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
        function combo(n, r) { return fact(n) / (fact(r) * fact(n - r)); }
        let sum = 0;
        for (let n = 0; n <= N; n++) {
            sum += (fact(N) / fact(N - n)) * Math.pow(X, n);
        }
        const p0 = 1 / sum;
        let L = 0;
        for (let n = 0; n <= N; n++) {
            const pn = (fact(N) / fact(N - n)) * Math.pow(X, n) * p0;
            L += n * pn;
        }
        document.getElementById('fq-l').innerText = L.toFixed(2);
        document.getElementById('fq-w').innerText = (L / ((N - L) / U)).toFixed(1);
    }

    function calcProcessCapability() {
        const mu = getVal('cpk-mean');
        const sig = getVal('cpk-sigma');
        const usl = getVal('cpk-usl');
        const lsl = getVal('cpk-lsl');
        if (sig <= 0) return;
        const cp = (usl - lsl) / (6 * sig);
        const cpk = Math.min((usl - mu) / (3 * sig), (mu - lsl) / (3 * sig));
        setText('cpk-cp', cp.toFixed(2));
        setText('cpk-cpk', cpk.toFixed(2));
        setText('cap-cp', cp.toFixed(2));
        setText('cap-cpk', cpk.toFixed(2));
        const status = document.getElementById('cap-status');
        if (!status) return;
        if (cpk >= 1.33) {
            status.className = "alert alert-success mt-4";
            status.innerText = "Process is Capable (Six Sigma Ready) ✓";
        } else if (cpk >= 1.0) {
            status.className = "alert alert-warning mt-4";
            status.innerText = "Marginally Capable";
        } else {
            status.className = "alert alert-danger mt-4";
            status.innerText = "NOT CAPABLE";
        }
    }

    function calcCentroid() {
        // Get all location points
        const locations = [
            { x: parseFloat(document.getElementById('c-ax').value) || 0, y: parseFloat(document.getElementById('c-ay').value) || 0, v: parseFloat(document.getElementById('c-av').value) || 0 },
            { x: parseFloat(document.getElementById('c-bx').value) || 0, y: parseFloat(document.getElementById('c-by').value) || 0, v: parseFloat(document.getElementById('c-bv').value) || 0 },
            { x: parseFloat(document.getElementById('c-cx').value) || 0, y: parseFloat(document.getElementById('c-cy').value) || 0, v: parseFloat(document.getElementById('c-cv').value) || 0 },
            { x: parseFloat(document.getElementById('c4-x').value) || 0, y: parseFloat(document.getElementById('c4-y').value) || 0, v: parseFloat(document.getElementById('c4-v').value) || 0 }
        ];

        const totalVolume = locations.reduce((sum, loc) => sum + loc.v, 0);
        if (totalVolume === 0) {
            document.getElementById('p-centroid-res').innerText = 'N/A';
            return;
        }

        const cx = locations.reduce((sum, loc) => sum + loc.x * loc.v, 0) / totalVolume;
        const cy = locations.reduce((sum, loc) => sum + loc.y * loc.v, 0) / totalVolume;

        document.getElementById('p-centroid-res').innerText = `X: ${cx.toFixed(1)}, Y: ${cy.toFixed(1)}`;
    }

    function calcLinearRegression() {
        calcRegression();
    }

    function calcLRForecast() {
        calcRegForecast();
    }

    function calcEPQ() {
        const D = parseFloat(document.getElementById('eoq-d').value) || 0;
        const S = parseFloat(document.getElementById('eoq-s').value) || 0;
        const H = parseFloat(document.getElementById('eoq-h').value) || 1;
        const p = parseFloat(document.getElementById('epq-p').value) || 1;
        const d = parseFloat(document.getElementById('epq-d').value) || 0;
        
        if (p <= d) {
            document.getElementById('epq-q-res').innerText = 'N/A';
            return;
        }
        
        const q = Math.sqrt((2 * D * S) / (H * (1 - d / p)));
        const tc = (D / q) * S + (q / 2) * H * (1 - d / p);
        document.getElementById('epq-q-res').innerText = Math.round(q).toLocaleString();
        document.getElementById('epq-tc-res').innerText = '$' + Math.round(tc).toLocaleString();
    }

    function calcQuantityDiscount() {
        const D = parseFloat(document.getElementById('eoq-d').value) || 10000;
        const S = parseFloat(document.getElementById('eoq-s').value) || 50;
        const I = 0.20; 

        const tiers = [
            { minQty: 0, maxQty: 99, price: 5.00 },
            { minQty: 100, maxQty: 499, price: 4.50 },
            { minQty: 500, maxQty: Infinity, price: 4.00 }
        ];

        let bestTC = Infinity;
        let bestIdx = 0;

        tiers.forEach((tier, idx) => {
            const H = tier.price * I;
            let Q = Math.sqrt((2 * D * S) / H);
            if (Q < tier.minQty) Q = tier.minQty;
            if (Q > tier.maxQty && tier.maxQty !== Infinity) Q = tier.maxQty;

            const TC = (D / Q) * S + (Q / 2) * H + (D * tier.price);
            const resEl = document.getElementById(`qd-tc-${idx}`);
            if (resEl) resEl.innerText = '$' + Math.round(TC).toLocaleString();

            if (TC < bestTC) {
                bestTC = TC;
                bestIdx = idx;
            }
        });
    }

    // New Module Functions
    function calcLeanImprovement() {
        const rm = parseFloat(document.getElementById('lean-rm').value) || 0;
        const wip = parseFloat(document.getElementById('lean-wip').value) || 0;
        const fg = parseFloat(document.getElementById('lean-fg').value) || 0;
        const rmRed = (parseFloat(document.getElementById('lean-rm-red').value) || 0) / 100;
        const wipRed = (parseFloat(document.getElementById('lean-wip-red').value) || 0) / 100;
        const fgRed = (parseFloat(document.getElementById('lean-fg-red').value) || 0) / 100;

        const futureLT = rm * (1 - rmRed) + wip * (1 - wipRed) + fg * (1 - fgRed);
        const currentLT = rm + wip + fg;
        const reduction = currentLT > 0 ? ((currentLT - futureLT) / currentLT) * 100 : 0;

        document.getElementById('lean-future-lt').innerText = futureLT.toFixed(1);
        document.getElementById('lean-reduction').innerText = Math.round(reduction) + '%';
    }

    function calcTCO() {
        const aP = parseFloat(document.getElementById('tco-a-price').value) || 0;
        const aS = parseFloat(document.getElementById('tco-a-ship').value) || 0;
        const bP = parseFloat(document.getElementById('tco-b-price').value) || 0;
        const bS = parseFloat(document.getElementById('tco-b-ship').value) || 0;
        
        document.getElementById('tco-a-total').innerText = '$' + (aP + aS).toFixed(2);
        document.getElementById('tco-b-total').innerText = '$' + (bP + bS).toFixed(2);
    }

    function calcSamplingPlan() {
        const n = parseFloat(document.getElementById('samp-n').value) || 50;
        const c = parseFloat(document.getElementById('samp-c').value) || 2;
        const p = parseFloat(document.getElementById('samp-p').value) || 0.05;

        function binom(n, k) {
            let res = 1;
            for (let i = 0; i < k; i++) res = res * (n - i) / (i + 1);
            return res;
        }

        let pa = 0;
        for (let d = 0; d <= c; d++) {
            pa += binom(n, d) * Math.pow(p, d) * Math.pow(1 - p, n - d);
        }
        document.getElementById('samp-pa').innerText = pa.toFixed(3);
    }

    function calcPERTActivities() {
        const totalTE = 0; // Simplified for this patch
    }

    function calcMRPExample() {
        const val = document.getElementById('mrp-bom-select').value;
        const tree = document.getElementById('bom-tree');
        if (val === 'A') {
            tree.innerHTML = `(Level 0) Product A<br>├── (Level 1) Sub-B (x2)<br>│   └── (Level 2) Part-D (x4)<br>└── (Level 1) Sub-C (x1)<br>    └── (Level 2) Part-E (x2)`;
        } else {
            tree.innerHTML = `(Level 0) Product B<br>└── (Level 1) Component X (x5)`;
        }
    }


    // --- Patch v3.2 JS Integration ---
    function calcFMEA() {
        let totalRPN = 0, highestRPN = 0, count = 0;
        for(let i=1; i<=10; i++) {
            const sEl = document.getElementById(`fmea-s-${i}`);
            if (!sEl) continue;
            const s = parseFloat(sEl.value) || 0;
            const o = parseFloat(document.getElementById(`fmea-o-${i}`).value) || 0;
            const d = parseFloat(document.getElementById(`fmea-d-${i}`).value) || 0;
            const rpn = s * o * d;
            document.getElementById(`fmea-rpn-${i}`).innerText = rpn;
            totalRPN += rpn; count++;
            if (rpn > highestRPN) highestRPN = rpn;
        }
        document.getElementById("fmea-total-rpn").innerText = totalRPN;
        document.getElementById("fmea-highest-rpn").innerText = highestRPN;
        document.getElementById("fmea-avg-rpn").innerText = count > 0 ? Math.round(totalRPN/count) : 0;
    }

    function calcDPMO() {
        const units = parseFloat(document.getElementById("dpmo-units").value) || 0;
        const defects = parseFloat(document.getElementById("dpmo-defects").value) || 0;
        const opp = parseFloat(document.getElementById("dpmo-opp").value) || 0;
        if (units <= 0 || opp <= 0) return;
        const dpmo = Math.round((defects / (units * opp)) * 1000000);
        const dpu = defects / units;
        const yield = Math.exp(-dpu) * 100;
        document.getElementById("dpmo-result").innerText = dpmo.toLocaleString();
        document.getElementById("dpmo-dpu").innerText = dpu.toFixed(4);
        document.getElementById("dpmo-yield").innerText = yield.toFixed(1) + "%";
        let sigma = 0; if (dpmo <= 3.4) sigma = 6; else if (dpmo <= 233) sigma = 5; else if (dpmo <= 6210) sigma = 4; else if (dpmo <= 66807) sigma = 3; else sigma = 2;
        document.getElementById("dpmo-sigma").innerText = sigma + "u03C3";
    }

    function calcPareto() {
        const freqs = Array.from(document.querySelectorAll(".pareto-freq")).map(i => parseFloat(i.value) || 0);
        const total = freqs.reduce((a, b) => a + b, 0);
        const svg = document.getElementById("pareto-svg");
        if (!svg) return;
        let s = ""; let cum = 0;
        freqs.sort((a, b) => b - a).forEach((f, i) => {
            const h = (f / freqs[0]) * 200;
            s += `<rect x="${50 + i*60}" y="${250-h}" width="40" height="${h}" fill="#6366f1" />`;
            cum += f/total; const cy = 250 - cum*200;
            s += `<circle cx="${70 + i*60}" cy="${cy}" r="4" fill="red" />`;
        });
        svg.innerHTML = s;
    }

    function drawFishbone() {
        const svg = document.getElementById("fishbone-svg"); if (!svg) return;
        const p = document.getElementById("fishbone-problem").value;
        let s = `<line x1="50" y1="200" x2="750" y2="200" stroke="#334155" stroke-width="3" />`;
        s += `<text x="760" y="205" font-size="14" font-weight="bold">${p}</text>`;
        const cats = ["Man", "Machine", "Method"];
        cats.forEach((c, i) => {
            const x = 150 + i*200;
            s += `<line x1="${x}" y1="50" x2="${x+50}" y2="200" stroke="#6366f1" stroke-width="2" />`;
            s += `<text x="${x}" y="45" font-size="12" font-weight="bold">${c}</text>`;
        });
        svg.innerHTML = s;
    }

    function calcFactorRating() {
        const ws = Array.from(document.querySelectorAll(".fr-w")).map(i => parseFloat(i.value) || 0);
        const as = Array.from(document.querySelectorAll(".fr-a")).map(i => parseFloat(i.value) || 0);
        const bs = Array.from(document.querySelectorAll(".fr-b")).map(i => parseFloat(i.value) || 0);
        let tw = 0, ta = 0, tb = 0;
        ws.forEach((w, i) => { tw += w; ta += w * as[i]; tb += w * bs[i]; });
        document.getElementById("fr-total-w").innerText = tw.toFixed(2);
        document.getElementById("fr-total-a").innerText = ta.toFixed(1);
        document.getElementById("fr-total-b").innerText = tb.toFixed(1);
    }

    function calcCrash() {
        const nts = Array.from(document.querySelectorAll(".crash-nt")).map(i => parseFloat(i.value) || 0);
        const cts = Array.from(document.querySelectorAll(".crash-ct")).map(i => parseFloat(i.value) || 0);
        const ncs = Array.from(document.querySelectorAll(".crash-nc")).map(i => parseFloat(i.value) || 0);
        const ccs = Array.from(document.querySelectorAll(".crash-cc")).map(i => parseFloat(i.value) || 0);
        let nd = 0, md = 0, tc = 0;
        nts.forEach((nt, i) => {
            nd += nt; md += cts[i]; tc += ccs[i];
            const cpd = (ccs[i] - ncs[i]) / (nt - cts[i]);
            document.getElementById(`crash-cpd-${i+1}`).innerText = "$" + Math.round(cpd);
        });
        document.getElementById("crash-normal-dur").innerText = nd;
        document.getElementById("crash-min-dur").innerText = md;
        document.getElementById("crash-total-cost").innerText = "$" + tc.toLocaleString();
    }

    function calcBOM() {
        const q = parseFloat(document.getElementById("bom-qty").value) || 0;
        document.getElementById("bom-end-qty").innerText = q;
        document.getElementById("bom-m").innerText = q;
        document.getElementById("bom-n").innerText = q * 2;
        document.getElementById("bom-o").innerText = q * 1;
        document.getElementById("bom-p-total").innerText = (q * 2 * 3) + (q * 1 * 2);
    }

    // === Patch v3.3 JS === 
    function toggleAns(id){const e=document.getElementById(id);if(e)e.classList.toggle("show");}

    function calcExponential(){
        const lam=getVal("exp-lambda"),t=getVal("exp-t");
        const pWithin=1-Math.exp(-lam*t);
        const pBeyond=Math.exp(-lam*t);
        setText("exp-within",(pWithin*100).toFixed(1)+"%");
        setText("exp-beyond",(pBeyond*100).toFixed(1)+"%");
        setText("exp-table-lambda",lam);
        const tbody=getEl("exp-table-body");if(!tbody)return;
        let html="";
        const tVals=[0.5,1,1.5,2,2.5,3,4,5,6,8,10];
        tVals.forEach(tv=>{
            const pb=Math.exp(-lam*tv);
            const pw=1-pb;
            const isTarget=Math.abs(tv-t)<0.01;
            html+=`<tr${isTarget?" class=\"lookup-highlight\"":""}><td>${tv}</td><td>${(pb*100).toFixed(2)}%</td><td>${(pw*100).toFixed(2)}%</td></tr>`;
        });
        tbody.innerHTML=html;
    }

    function factorial_v33(n){if(n<=1)return 1;let r=1;for(let i=2;i<=n;i++)r*=i;return r}

    function calcPoisson(){
        const lam=getVal("poi-lambda"),T=getVal("poi-T"),n=getVal("poi-n");
        const lt=lam*T;
        const pn=Math.pow(lt,n)*Math.exp(-lt)/factorial_v33(n);
        setText("poi-result",(pn*100).toFixed(1)+"%");
        setText("poi-table-lt",lt.toFixed(1));
        const tbody=getEl("poi-table-body");if(!tbody)return;
        let html="",cumP=0;
        for(let i=0;i<=Math.min(15,Math.ceil(lt*3));i++){
            const pi=Math.pow(lt,i)*Math.exp(-lt)/factorial_v33(i);
            cumP+=pi;
            const isTarget=i===n;
            html+=`<tr${isTarget?" class=\"lookup-highlight\"":""}><td>${i}</td><td>${(pi*100).toFixed(2)}%</td><td>${(cumP*100).toFixed(2)}%</td></tr>`;
        }
        tbody.innerHTML=html;
    }

    function calcMMsModel(lambda,mu,s){
        const rho=lambda/(s*mu);
        if(rho>=1)return{Lq:Infinity,P0:0,rho:rho};
        function fact(n){return n<=1?1:n*fact(n-1)}
        let sum=0;
        for(let n=0;n<s;n++)sum+=Math.pow(lambda/mu,n)/fact(n);
        sum+=(Math.pow(lambda/mu,s)/fact(s))*(1/(1-rho));
        const P0=1/sum;
        const Lq=(P0*Math.pow(lambda/mu,s)*rho)/(fact(s)*Math.pow(1-rho,2));
        return{Lq:Lq,P0:P0,rho:rho};
    }

    function buildLqTable(){
        const tbody=getEl("lq-table-body");if(!tbody)return;
        const ratios=[0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95,1.0,1.2,1.4,1.6,1.8,2.0,2.5,3.0,3.5,4.0,4.5,5.0];
        let html="";
        ratios.forEach(r=>{
            html+=`<tr><td><strong>${r.toFixed(2)}</strong></td>`;
            for(let s=1;s<=4;s++){
                const res=calcMMsModel(r,1,s);
                if(res.rho>=1||res.Lq===Infinity){
                    html+=`<td style="color:#ccc">&mdash;</td>`;
                }else{
                    html+=`<td>${res.Lq<0.001?"&lt;0.001":res.Lq.toFixed(3)}</td>`;
                }
            }
            html+=`</tr>`;
        });
        tbody.innerHTML=html;
    }

    function highlightLqTable(){
        const ratio=getVal("lq-lookup-ratio");
        const s=getVal("lq-lookup-s");
        const res=calcMMsModel(ratio,1,s);
        if(res.rho>=1){
            setText("lq-lookup-result","Unstable");
        }else{
            setText("lq-lookup-result",res.Lq.toFixed(3));
        }
        const rows=document.querySelectorAll("#lq-table-body tr");
        rows.forEach(row=>{
            const cells=row.querySelectorAll("td");
            if(cells.length>0){
                const rowRatio=parseFloat(cells[0].textContent);
                row.classList.toggle("lookup-highlight",Math.abs(rowRatio-ratio)<0.01);
            }
        });
    }

    function calcQueueCost(){
        const lambda=getVal("qc-lambda");
        const cw=getVal("qc-cw");
        const cs=getVal("qc-cs");
        const workers=document.querySelectorAll(".qc-workers");
        const mus=document.querySelectorAll(".qc-mu");
        let bestTC=Infinity,bestCase="";
        workers.forEach((w,i)=>{
            const nw=+w.value||1;
            const mu=mus[i]?+mus[i].value:1;
            const rho=lambda/mu;
            const idx=i+1;
            if(rho>=1){
                setText("qc-rho-"+idx,"Unstable");
                setText("qc-ls-"+idx,"\u221E");
                setText("qc-dc-"+idx,"\u221E");
                setText("qc-lc-"+idx,"$"+(nw*cs).toFixed(2));
                setText("qc-tc-"+idx,"\u221E");
                return;
            }
            const ls=lambda/(mu-lambda);
            const dc=ls*cw;
            const lc=nw*cs;
            const tc=dc+lc;
            setText("qc-rho-"+idx,rho.toFixed(2));
            setText("qc-ls-"+idx,ls.toFixed(2));
            setText("qc-dc-"+idx,"$"+dc.toFixed(2));
            setText("qc-lc-"+idx,"$"+lc.toFixed(2));
            setText("qc-tc-"+idx,"$"+tc.toFixed(2));
            if(tc<bestTC){bestTC=tc;bestCase="Case "+(i===0?"I":i===1?"II":"III")+" ("+nw+" worker"+(nw>1?"s":"")+")"}
        });
    }

    function normalCDFInverse(p){
        if(p<=0)return-Infinity;if(p>=1)return Infinity;
        if(p<0.5)return-normalCDFInverse(1-p);
        const t=Math.sqrt(-2*Math.log(1-p));
        const c0=2.515517,c1=0.802853,c2=0.010328;
        const d1=1.432788,d2=0.189269,d3=0.001308;
        return t-(c0+c1*t+c2*t*t)/(1+d1*t+d2*t*t+d3*t*t*t);
    }

    function calcNewsvendor(){
        const price=getVal("nv-price"),cost=getVal("nv-cost"),salvage=getVal("nv-salvage");
        const mu=getVal("nv-mu"),sigma=getVal("nv-sigma");
        const cu=price-cost; const co=cost-salvage;
        const cr=(cu+co)>0?cu/(cu+co):0.5;
        const z=normalCDFInverse(cr);
        const q=Math.round(mu+z*sigma);
        setText("nv-cu","$"+cu); setText("nv-co","$"+co);
        setText("nv-cr",cr.toFixed(3)); setText("nv-z",z.toFixed(2));
        setText("nv-q",q);
    }

    function buildRegTable(){
        const tbody=getEl("reg-body");if(!tbody)return;
        const regData=[600,1550,1500,1500,2400,3100,2600,2900,3800,4500,4000,4900];
        let html="";
        regData.forEach((y,i)=>{
            const x=i+1;
            html+=`<tr><td>${x}</td><td><input type="number" value="${y}" class="reg-y" style="width:80px" oninput="calcRegression()"></td></tr>`;
        });
        tbody.innerHTML=html;
    }

    function calcRegression(){
        const yInputs=document.querySelectorAll(".reg-y");
        const n=yInputs.length;
        let sumX=0,sumY=0,sumXY=0,sumX2=0;
        yInputs.forEach((inp,i)=>{
            const x=i+1,y=+inp.value||0;
            sumX+=x;sumY+=y;sumXY+=x*y;sumX2+=x*x;
        });
        const b=(n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX);
        const a=(sumY-b*sumX)/n;
        setText("reg-equation",`Y = ${b.toFixed(1)}x + ${a.toFixed(1)}`);
        window._reg_a=a;window._reg_b=b;
        calcRegForecast();
    }

    function calcRegForecast(){
        const x=getVal("reg-forecast-x");
        if(window._reg_a===undefined)return;
        const y=window._reg_a+window._reg_b*x;
        setText("reg-forecast-y",Math.round(y).toLocaleString());
    }

    function calcRisk(){
        const probs=document.querySelectorAll(".risk-p");
        const impacts=document.querySelectorAll(".risk-i");
        let totalScore=0;
        probs.forEach((p,i)=>{
            const pv=+p.value||1,iv=impacts[i]?+impacts[i].value:1;
            const score=pv*iv; totalScore+=score;
            if(getEl(`risk-score-${i+1}`)) getEl(`risk-score-${i+1}`).textContent=score;
        });
        setText("risk-total-score",totalScore);
    }

    // ============================================================
    // PATCH 3.4 - FINAL 100% COVERAGE
    // ============================================================

    // p-CHART
    const pcDefectives=[10,8,12,7,9,11,6,13,8,7];
    function buildPChart(){
        const tbody=getEl('pc-body');if(!tbody)return;
        let html='';
        pcDefectives.forEach((d,i)=>{html+=`<tr><td>${i+1}</td><td><input type="number" value="${d}" style="width:60px" class="pc-def" oninput="calcPChart()"></td><td id="pc-p-${i+1}">${(d/300).toFixed(4)}</td></tr>`});
        tbody.innerHTML=html;
    }
    function calcPChart(){
        const n=getVal('pc-n')||300;
        const defs=document.querySelectorAll('.pc-def');
        let totalDef=0;
        defs.forEach((d,i)=>{const v=+d.value||0;totalDef+=v;setText('pc-p-'+(i+1),(v/n).toFixed(4))});
        const totalInsp=defs.length*n;
        const pbar=totalDef/totalInsp;
        const sp=Math.sqrt(pbar*(1-pbar)/n);
        const ucl=Math.min(1,pbar+3*sp);
        const lcl=Math.max(0,pbar-3*sp);
        setText('pc-pbar',fmt(pbar,4));setText('pc-sp',fmt(sp,5));setText('pc-ucl',fmt(ucl,4));setText('pc-lcl',fmt(lcl,4));
        drawPChartSVG(defs,n,pbar,ucl,lcl);
    }
    function drawPChartSVG(defs,n,pbar,ucl,lcl){
        const svg=getEl('pchart-svg');if(!svg)return;
        const w=500,h=280,ml=50,mr=20,mt=20,mb=40,pw=w-ml-mr,ph=h-mt-mb;
        const maxP=Math.max(ucl*1.2,0.08);
        let s=`<line x1="${ml}" y1="${mt+ph}" x2="${w-mr}" y2="${mt+ph}" stroke="#334155" stroke-width="2"/>`;
        s+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ph}" stroke="#334155" stroke-width="2"/>`;
        const uclY=mt+ph-(ucl/maxP)*ph,lclY=mt+ph-(lcl/maxP)*ph,pbarY=mt+ph-(pbar/maxP)*ph;
        s+=`<line x1="${ml}" y1="${uclY}" x2="${w-mr}" y2="${uclY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>`;
        s+=`<text x="${w-mr+2}" y="${uclY+4}" font-size="9" fill="#ef4444">UCL</text>`;
        s+=`<line x1="${ml}" y1="${lclY}" x2="${w-mr}" y2="${lclY}" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4"/>`;
        s+=`<text x="${w-mr+2}" y="${lclY+4}" font-size="9" fill="#10b981">LCL</text>`;
        s+=`<line x1="${ml}" y1="${pbarY}" x2="${w-mr}" y2="${pbarY}" stroke="#6366f1" stroke-width="2"/>`;
        s+=`<text x="${w-mr+2}" y="${pbarY+4}" font-size="9" fill="#6366f1">p̄</text>`;
        let pts='';
        defs.forEach((d,i)=>{
            const p=(+d.value||0)/n;
            const x=ml+20+i*(pw-40)/(defs.length-1);
            const y=mt+ph-(p/maxP)*ph;
            pts+=`${x},${y} `;
            const color=p>ucl||p<lcl?'#ef4444':'#6366f1';
            s+=`<circle cx="${x}" cy="${y}" r="5" fill="${color}"/>`;
            s+=`<text x="${x}" y="${mt+ph+15}" font-size="9" fill="#64748b" text-anchor="middle">${i+1}</text>`;
        });
        s+=`<polyline points="${pts}" fill="none" stroke="#6366f1" stroke-width="1.5"/>`;
        svg.innerHTML=s;
    }

    // c-CHART
    const ccDefects=[3,5,4,6,2,7,3,5,4,6];
    function buildCChart(){
        const tbody=getEl('cc-body');if(!tbody)return;
        let html='';
        ccDefects.forEach((d,i)=>{html+=`<tr><td>${i+1}</td><td><input type="number" value="${d}" style="width:60px" class="cc-def" oninput="calcCChart()"></td></tr>`});
        tbody.innerHTML=html;
    }
    function calcCChart(){
        const defs=document.querySelectorAll('.cc-def');
        let total=0;defs.forEach(d=>{total+=(+d.value||0)});
        const cbar=total/defs.length;
        const ucl=cbar+3*Math.sqrt(cbar);
        const lcl=Math.max(0,cbar-3*Math.sqrt(cbar));
        setText('cc-cbar',fmt(cbar,1));setText('cc-ucl',fmt(ucl,2));setText('cc-lcl',fmt(lcl,2));
    }

    // Cpk
    function calcCpk(){
        const usl=getVal('cpk-usl'),lsl=getVal('cpk-lsl'),mean=getVal('cpk-mean'),sigma=getVal('cpk-sigma');
        if(sigma<=0)return;
        const cp=(usl-lsl)/(6*sigma);
        const cpu=(usl-mean)/(3*sigma);
        const cpl=(mean-lsl)/(3*sigma);
        const cpk=Math.min(cpu,cpl);
        setText('cpk-cp',fmt(cp));setText('cpk-cpk',fmt(cpk));setText('cpk-cpu',fmt(cpu));setText('cpk-cpl',fmt(cpl));
        setText('cap-cp',fmt(cp));setText('cap-cpk',fmt(cpk));setText('cap-sigma',fmt(cpk*3,1)+'σ');setText('cap-ppm',cpkToPPM(cpk).toLocaleString());
        const maxGauge=204;
        const cpGauge=getEl('cp-gauge'),cpkGauge=getEl('cpk-gauge');
        if(cpGauge)cpGauge.style.strokeDashoffset=maxGauge-(Math.min(Math.max(cp,0),2)/2)*maxGauge;
        if(cpkGauge)cpkGauge.style.strokeDashoffset=maxGauge-(Math.min(Math.max(cpk,0),2)/2)*maxGauge;
        const el=getEl('cpk-assessment'),txt=getEl('cpk-assess-text');
        if(el&&txt){
            if(cpk>=1.33){el.className='alert alert-success mt-3';txt.innerHTML=`<strong>Excellent:</strong> Cpk = ${fmt(cpk)} &ge; 1.33. Process is capable.`}
            else if(cpk>=1.0){el.className='alert alert-warning mt-3';txt.innerHTML=`<strong>Marginal:</strong> Cpk = ${fmt(cpk)}. Process barely capable. Improvement recommended.`}
            else{el.className='alert alert-danger mt-3';txt.innerHTML=`<strong>Not Capable:</strong> Cpk = ${fmt(cpk)} &lt; 1.0. Process produces defects. Immediate action needed.`}
        }
        const status=getEl('cap-status');
        if(status){
            if(cpk>=1.33){status.className='alert alert-success mt-3';status.innerHTML=`<div class="alert-icon">✅</div><div><strong>Capable:</strong> Cpk = ${fmt(cpk)} &ge; 1.33.</div>`}
            else if(cpk>=1.0){status.className='alert alert-warning mt-3';status.innerHTML=`<div class="alert-icon">⚠️</div><div><strong>Marginal:</strong> Cpk = ${fmt(cpk)}.</div>`}
            else{status.className='alert alert-danger mt-3';status.innerHTML=`<div class="alert-icon">🔴</div><div><strong>Not Capable:</strong> Cpk = ${fmt(cpk)} &lt; 1.0.</div>`}
        }
    }

    // LINE BALANCING
    function calcLineBalance(){
        const prodTime=getVal('lb-prodtime'),output=getVal('lb-output'),sumTask=getVal('lb-sumtask'),stations=getVal('lb-stations');
        if(output<=0||stations<=0)return;
        const cycle=prodTime/output;
        const nmin=Math.ceil(sumTask/cycle);
        const eff=(sumTask/(stations*cycle))*100;
        const delay=100-eff;
        const idle=stations*cycle-sumTask;
        setText('lb-cycle',Math.round(cycle)+'s');setText('lb-nmin',nmin);
        setText('lb-eff',fmt(eff,1)+'%');setText('lb-delay',fmt(delay,1)+'%');
        setText('lb-idle',Math.round(idle)+'s');
        const vis=getEl('lb-vis');
        if(vis){
            vis.innerHTML='';
            const avgTaskPerStation=sumTask/stations;
            for(let i=1;i<=stations;i++){
                const u=Math.min(100,(avgTaskPerStation/cycle)*100);
                const color=u>=90?'#10b981':u>=70?'#f59e0b':'#ef4444';
                const d=document.createElement('div');
                d.style.cssText=`width:75px;height:75px;background:linear-gradient(to top,${color} ${u}%,var(--border-color) ${u}%);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${u>50?'white':'var(--text-primary)'};font-weight:bold;font-size:.75rem`;
                d.innerHTML=`WS${i}<br>${u.toFixed(0)}%`;
                vis.appendChild(d);
            }
        }
    }

    // PERT PROBABILITY
    function calcPERTProb(){
        const te=getVal('pert-te'),d=getVal('pert-d'),v=getVal('pert-var');
        if(v<=0)return;
        const z=(d-te)/Math.sqrt(v);
        const prob=normalCDF(z)*100;
        setText('pert-z',fmt(z));setText('pert-prob',fmt(prob,1)+'%');
    }
    function buildZTable(){
        const tbody=getEl('z-table-body');if(!tbody)return;
        let html='';
        for(let row=-3.0;row<=3.0;row+=0.1){
            const r=Math.round(row*10)/10;
            html+=`<tr><td><strong>${r>=0?'+':''}${r.toFixed(1)}</strong></td>`;
            for(let col=0;col<=9;col++){
                const z=r+col*0.01;
                const p=normalCDF(z);
                html+=`<td>${p.toFixed(4)}</td>`;
            }
            html+=`</tr>`;
        }
        tbody.innerHTML=html;
    }

    // TRANSPORTATION
    function calcTransport(){
        const costs=document.querySelectorAll('.tc');
        const allocs=document.querySelectorAll('.ta');
        let total=0;
        costs.forEach((c,i)=>{total+=(+c.value||0)*(+allocs[i]?.value||0)});
        setText('transport-cost','$'+total.toLocaleString());
        const tbody=getEl('tr-allocation-body');
        if(tbody&&allocs.length>=9){
            const names=['Source A','Source B','Source C'];
            let html='';
            for(let r=0;r<3;r++){
                html+=`<tr><td><strong>${names[r]}</strong></td>`;
                for(let c=0;c<3;c++){
                    const idx=r*3+c;
                    html+=`<td>${(+allocs[idx].value||0).toLocaleString()}</td>`;
                }
                html+='</tr>';
            }
            tbody.innerHTML=html;
        }
    }

    // FORECASTING
    function switchForecastTab(btn,tabId){
        btn.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('#forecast-module .tab-content').forEach(c=>c.classList.remove('active'));
        const target=getEl('forecast-'+tabId);if(target)target.classList.add('active');
    }
    function calcWMA(){
        const w1=getVal('wma-w1'),w2=getVal('wma-w2'),w3=getVal('wma-w3');
        const d1=getVal('wma-d1'),d2=getVal('wma-d2'),d3=getVal('wma-d3');
        const tw=w1+w2+w3;
        const wma=tw>0?(w1*d1+w2*d2+w3*d3)/tw:0;
        setText('wma-result',fmt(wma,1));
    }
    function calcHolts(){
        const a=getVal('holt-alpha'),b=getVal('holt-beta'),l0=getVal('holt-l0'),t0=getVal('holt-t0'),at=getVal('holt-at');
        const lt=a*at+(1-a)*(l0+t0);
        const tt=b*(lt-l0)+(1-b)*t0;
        const forecast=lt+tt;
        setText('holt-lt',fmt(lt,1));setText('holt-tt',fmt(tt,1));setText('holt-forecast',fmt(forecast,1));
    }
    function calcSeasonal(){
        const inputs=document.querySelectorAll('.si-d');
        const quarters=4,years=3;
        let grandTotal=0;
        for(let q=0;q<quarters;q++){
            let qTotal=0;
            for(let y=0;y<years;y++){const v=+inputs[q*years+y]?.value||0;qTotal+=v;grandTotal+=v}
            const qAvg=qTotal/years;
            setText('si-avg-'+(q+1),fmt(qAvg,1));
        }
        const overall=grandTotal/(quarters*years);
        setText('si-overall',fmt(overall,1));
        for(let q=0;q<quarters;q++){
            const avgText=getEl('si-avg-'+(q+1))?.textContent;
            const qAvg=parseFloat(avgText)||0;
            const idx=overall>0?qAvg/overall:0;
            setText('si-idx-'+(q+1),fmt(idx,2));
        }
    }
    const tsData=[{a:200,f:190},{a:210,f:195},{a:195,f:200},{a:220,f:205},{a:215,f:210},{a:230,f:215}];
    function buildTrackingSignal(){
        const tbody=getEl('ts-body');if(!tbody)return;
        let html='',rsfe=0,sumAbs=0,sumAPE=0;
        tsData.forEach((d,i)=>{
            const err=d.a-d.f;rsfe+=err;sumAbs+=Math.abs(err);
            const mad=sumAbs/(i+1);const ts=mad>0?rsfe/mad:0;
            const ape=d.a>0?Math.abs(err)/d.a*100:0;sumAPE+=ape;
            html+=`<tr><td>${i+1}</td><td>${d.a}</td><td>${d.f}</td><td>${err>0?'+':''}${err}</td><td>${Math.abs(err)}</td><td>${rsfe>0?'+':''}${rsfe}</td><td>${fmt(mad,1)}</td><td class="${Math.abs(ts)>4?'danger-cell':'highlight-cell'}">${fmt(ts,2)}</td></tr>`;
            if(i===tsData.length-1){setText('ts-mad',fmt(mad,1));setText('ts-signal',fmt(ts,2));setText('ts-mape',fmt(sumAPE/(i+1),1)+'%')}
        });
        tbody.innerHTML=html;
    }

    // CONFIGURATION
    function calcConfig(){
        let total=1,components=0;
        for(let i=1;i<=5;i++){const v=getVal('cfg-'+i)||1;total*=v;components+=v}
        setText('cfg-total',total.toLocaleString());setText('cfg-components',components);
        setText('cfg-comp-text',components);setText('cfg-config-text',total.toLocaleString());
    }
