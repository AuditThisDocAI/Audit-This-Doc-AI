export default function Home() {
  return (
    <main style={{padding: '40px', textAlign: 'center', fontFamily: 'Arial'}}>
      <h1>AUDIT THIS DOC AI</h1>
      <p>Upload your invoice to start the audit</p>
     
      <button
        onClick={() => alert('API Connected! Next step: add upload form')}
        style={{padding: '12px 24px', fontSize: '16px', marginTop: '20px'}}
      >
        CHECK MY INVOICE
      </button>
    </main>
  )
}
