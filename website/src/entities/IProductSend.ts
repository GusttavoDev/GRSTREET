export default interface IProductSend {
    id: string,
    quantity: 1
    format: string;
    dimensions: { height: number; width: number; length: number };
    weight: string;
    declared_value: string;
    products: { id: string; quantity: number }[];
}