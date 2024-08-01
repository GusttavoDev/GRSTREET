export default function Product({ params }: { params: { id: number } }) {
    return (
        <p>{params.id}</p>
    )
}