import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { asset } from '@/lib/utils';

export async function downloadDataAnalyticsBrochure() {
  // build brochure HTML offscreen
  const wrapper = document.createElement('div');
  wrapper.style.width = '800px';
  wrapper.style.padding = '24px';
  wrapper.style.boxSizing = 'border-box';
  wrapper.style.background = '#ffffff';
  wrapper.style.color = '#0f172a';
  wrapper.style.fontFamily = 'Inter, Roboto, Helvetica, Arial, sans-serif';

  wrapper.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;padding-bottom:16px;border-bottom:2px solid #1e40af;margin-bottom:16px">
      <img src="${asset('skillverse-logo.svg')}" alt="SkillVerse" style="height:60px;object-fit:contain" />
    </div>
    
    <h1 style="font-size:32px;margin:0 0 8px;color:#1e3a8a;font-weight:700">Data Analytics Certification Program</h1>
    <p style="margin:0 0 16px;color:#374151;font-size:16px">Perfect for Working Professionals & Freshers — Master Data Analytics with Industry-Relevant Training</p>
    
    <h2 style="font-size:20px;margin-top:16px;margin-bottom:10px;color:#1e40af;font-weight:600">🎯 What You'll Learn</h2>
    <ul style="margin:0 0 14px 20px;color:#374151;line-height:1.7">
      <li><strong>SQL</strong> — Data querying, joins, optimization & database management</li>
      <li><strong>Python</strong> — Data processing with NumPy, Pandas & automation</li>
      <li><strong>Power BI & Tableau</strong> — Interactive dashboards & data visualization</li>
      <li><strong>Excel</strong> — Advanced formulas, pivot tables & data analysis</li>
      <li><strong>Apache Spark & AWS</strong> — Big data processing & cloud platforms</li>
      <li><strong>Industry Projects</strong> — Real-world capstone projects</li>
    </ul>
    
    <h2 style="font-size:20px;margin-top:16px;margin-bottom:10px;color:#1e40af;font-weight:600">✨ Program Benefits</h2>
    <ul style="margin:0 0 14px 20px;color:#374151;line-height:1.7">
      <li>Live sessions by <strong>industry experts</strong> (Ex-Deloitte, Capgemini, IBM)</li>
      <li>SkillVerse Lab for hands-on coding practice</li>
      <li>Job Assistance Program with resume & LinkedIn profile building</li>
      <li>Mock interviews & aptitude training</li>
      <li>3+ career guidance sessions & doubt clearing support</li>
      <li>Industry-recognized certificate on completion</li>
      <li>Email support throughout your journey</li>
    </ul>
    
    <h2 style="font-size:20px;margin-top:16px;margin-bottom:10px;color:#1e40af;font-weight:600">💼 Career Opportunities</h2>
    <div style="margin:0 0 14px 0;color:#374151;line-height:1.7">
      <strong>Data Analyst</strong> • <strong>Data Scientist</strong> • <strong>Data Engineer</strong> • <strong>Data Architect</strong> • <strong>Database Administrator</strong>
    </div>
    
    <h2 style="font-size:20px;margin-top:16px;margin-bottom:10px;color:#1e40af;font-weight:600">📊 Market Growth</h2>
    <p style="margin:0 0 14px;color:#374151;line-height:1.7">
      Global Data Analytics market valued at <strong>$154.2 billion (2023)</strong> and projected to reach <strong>$495.2 billion by 2030</strong> with <strong>16.4% CAGR</strong>.
    </p>
    
    <h2 style="font-size:20px;margin-top:16px;margin-bottom:10px;color:#1e40af;font-weight:600">💰 Investment</h2>
    <div style="background:#eff6ff;padding:12px;border-radius:8px;margin-bottom:14px">
      <div style="font-size:24px;color:#1e40af;font-weight:700;margin-bottom:4px">₹25,000</div>
      <div style="color:#374151;font-size:14px">No Cost EMI starting from ₹4,999/month</div>
      <div style="color:#dc2626;font-weight:600;margin-top:4px;font-size:14px">⏰ Batch Starting Soon!</div>
    </div>
    
    <div style="margin-top:20px;padding-top:16px;border-top:2px solid #e5e7eb;color:#6b7280;font-size:13px;line-height:1.6">
      <div><strong>Contact Us:</strong> contact@fullstackverse.com</div>
      <div style="margin-top:6px"><strong>Program by:</strong> SkillVerse by Fullstackverse</div>
      <div style="margin-top:10px;color:#9ca3af;font-size:11px">© ${new Date().getFullYear()} SkillVerse. All rights reserved.</div>
    </div>
  `;

  // place offscreen
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    // A4 in points: 595 x 842
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // compute image dims keeping aspect
    const imgProps = { width: canvas.width, height: canvas.height };
    const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;
    const marginX = (pdfWidth - imgWidth) / 2;
    const marginY = 20;

    pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    pdf.save('data-analytics-brochure.pdf');
  } catch (err) {
    console.error('Brochure generation failed', err);
    // fallback: open in new tab the HTML content
    const w = window.open();
    if (w) {
      w.document.write(wrapper.innerHTML);
      w.document.close();
    }
  } finally {
    document.body.removeChild(wrapper);
  }
}
