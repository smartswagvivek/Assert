from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import cm

input_path = r'docs/PROJECT_DOCUMENTATION.md'
output_path = r'docs/PROJECT_DOCUMENTATION.pdf'

styles = getSampleStyleSheet()
style_h1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, leading=20, spaceAfter=8)
style_h2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=12, leading=16, spaceAfter=6)
style_body = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=10, leading=14, spaceAfter=4)
style_code = ParagraphStyle('Code', parent=styles['BodyText'], fontName='Courier', fontSize=9, leading=12, leftIndent=12, spaceAfter=3)

doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=1.8*cm, bottomMargin=1.8*cm)
story = []

with open(input_path, 'r', encoding='utf-8') as f:
    for raw in f:
        line = raw.rstrip('\n')
        if not line.strip():
            story.append(Spacer(1, 6))
            continue

        esc = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

        if esc.startswith('# '):
            story.append(Paragraph(esc[2:], style_h1))
        elif esc.startswith('## '):
            story.append(Paragraph(esc[3:], style_h2))
        elif esc.startswith('- '):
            story.append(Paragraph('&bull; ' + esc[2:], style_body))
        elif esc[0].isdigit() and '. ' in esc[:4]:
            story.append(Paragraph(esc, style_body))
        else:
            story.append(Paragraph(esc, style_body if not esc.startswith('`') else style_code))

doc.build(story)
print('PDF_CREATED', output_path)
