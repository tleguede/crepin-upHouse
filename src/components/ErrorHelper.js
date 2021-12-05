export default function ErrorHelper({ error }) {
  return (
    <>
      {
        error && (
          <small style={{ color: 'red', fontSize: 12, marginLeft: 15 }}>
            {error}
          </small>
        )
      }
    </>
  );
}