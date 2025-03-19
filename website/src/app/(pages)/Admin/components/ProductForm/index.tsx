import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import IProduct from "@/entities/IProduct";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";

import './ProductForm.css'; // Import the CSS file

import SetProductUseCase from "@/connection/Product/UseCases/SetProductUseCase";
import PutProductUseCase from "@/connection/Product/UseCases/PutProductUseCase";
import IColor, { ISize } from "@/entities/IColor";
import IReview from "@/entities/IReview";

const setProductUseCase = new SetProductUseCase();
const putProductUseCase = new PutProductUseCase();

interface ProductFormProps {
  onClose: () => void;
  categories: ICategory[];
  subCategories: ISubCategory[];
  products: IProduct[];
  fetchProducts: () => Promise<void>;
  productEdit?: {
    destaqued: boolean;
    id?: string;
    name: string;
    description: string;
    category: string;
    sub_category: string;
    categoryId?: string;
    subCategoryId?: string;
    reviews: IReview[];
    colors: IColor[];
    relatedProducts: string[];
    images: string[];
    afiliado?: string;
    weight: string;  // Corrigido de "peso"
    height: string;
    width: string;
    length: string;  // Corrigido de "lenght"
    package_format?: "box" | "roll" | "envelope"; // Novo campo
    declared_value?: string; // Novo campo
    sku?: string; // Novo campo
  };

}

export default function ProductForm({ onClose, categories, subCategories, products, fetchProducts, productEdit }: ProductFormProps) {
  const [product, setProduct] = useState<IProduct>({
    id: productEdit?.id || '',
    name: productEdit?.name || '',
    description: productEdit?.description || '',
    category: productEdit?.categoryId?.toString() || '',
    sub_category: productEdit?.subCategoryId?.toString() || '',
    reviews: productEdit?.reviews || [],
    colors: productEdit?.colors || [],
    relatedProducts: productEdit?.relatedProducts || [],
    images: productEdit?.images || [],
    afiliado: productEdit?.afiliado || '',
    destaqued: productEdit?.destaqued ?? true,

    // Dados de envio para o Melhor Envio
    weight: productEdit?.weight ? String(Number(productEdit.weight) * 1000) : '', // Convertendo KG para gramas
    height: productEdit?.height || '',
    length: productEdit?.length || '',
    width: productEdit?.width || '',
    package_format: productEdit?.package_format || 'envelope', // Melhor Envio usa "package"
    declared_value: productEdit?.declared_value || '', // Melhor Envio usa "insurance_value"
    sku: productEdit?.sku || '',
});

  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [color, setColor] = useState<string>('');
  const [colorPrice, setColorPrice] = useState<number>(0);
  const [colorImageURLs, setColorImageURLs] = useState<string[]>([]);
  const [colorActived, setColorActived] = useState<boolean>(true);
  const [colorImposto, setColorImposto] = useState<string>('');
  const [colorNcm, setColorNcm] = useState<string>('');
  const [colorCusto, setColorCusto] = useState<string>('');
  const [colorStock, setColorStock] = useState<ISize[]>([]);  // Agora é um array de ISize
  const [colorSize, setColorSize] = useState<ISize[]>([]);      // Para armazenar os tamanhos e estoque  
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(null);
  const [relatedProductId, setRelatedProductId] = useState<string>('');
  const [valueMargin, setValueMargin] = useState<number>();
  const [margin, setMargin] = useState<number>();
  const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
  

  useEffect(() => {
    if (productEdit) { 
        const category = categories.find(cat => cat.id === productEdit.category || cat.id === productEdit.categoryId);
        const subCategory = subCategories.find(sub => sub.id === productEdit.sub_category || sub.id === productEdit.subCategoryId);

        setProduct(prevProduct => ({
            ...prevProduct,
            category: category ? category.id : '',
            sub_category: subCategory ? subCategory.id : '',
            reviews: productEdit.reviews,
            colors: productEdit.colors,
            relatedProducts: productEdit.relatedProducts,
            images: productEdit.images,
        }));
    }
}, [productEdit, categories, subCategories]);

  const handleCalc = () => {
    const custo = Number(colorImposto) + Number(colorCusto);
    setValueMargin(Number(custo) + (Number(custo) * Number(margin) / 100))
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    let newValue: any = value;
  
    // Converte valores numéricos
    if (type === "number") {
      newValue = value ? String(value) : "";
    }
  
    // Converte valores booleanos
    if (name === "destaqued") {
      newValue = value === "true";
    }
  
    setProduct(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };
  
  // Função para atualizar valores aninhados
  const updateNestedValue = (obj: any, keys: string[], value: any): any => {
    if (keys.length === 1) {
      return { ...obj, [keys[0]]: value };
    }
  
    const [firstKey, ...restKeys] = keys;
    return {
      ...obj,
      [firstKey]: updateNestedValue(obj[firstKey] || {}, restKeys, value)
    };
  };
  

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleColorPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorPrice(Number(e.target.value));
  };

  const handleColorSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sizeStock = e.target.value.split(',').map(item => {
      const [size, stock] = item.split('-');
      return { name: size, quantity: Number(stock) }; // Make sure to add 'quantity' here
    });
    setColorSize(sizeStock); // Now it matches the ISize structure
  };
  
  const handleColorNcmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorNcm(String(e.target.value));
  };

  const handleColorImpostoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorImposto(String(e.target.value));
  };


  const handleColorCustoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorCusto(String(e.target.value));
  };


  const handleMarginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMargin(Number(e.target.value));
  };

  const handleImageURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split('*').map(url => url.trim()).filter(url => url);
    setImageURLs(urls);
    setProduct(prev => ({
      ...prev,
      images: urls,
    }));
  };

  const handleColorImageURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split('*').map(url => url.trim()).filter(url => url);
    setColorImageURLs(urls);
  };

  const handleRemoveImage = (index: number, isColorImage: boolean) => {
    if (isColorImage) {
      setColorImageURLs(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageURLs(prev => prev.filter((_, i) => i !== index));
      setProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddRelatedProduct = () => {
    if (relatedProductId) {
      setProduct(prev => ({
        ...prev,
        relatedProducts: [...(prev.relatedProducts || []), relatedProductId]
      }));      
      setRelatedProductId('');
    }
  };

  const handleRemoveRelatedProduct = (id: string) => {
    setProduct(prev => ({
      ...prev,
      relatedProducts: (prev.relatedProducts || []).filter(productId => productId !== id)
    }));
  };

  const handleAddColor = () => {
    if (color && colorSize.length > 0) {
      const newColor: IColor = {
        id: '', // Gerar ou usar um id real
        name: color,
        price: colorPrice,
        sizes: colorSize,  // Agora você passa os tamanhos com o estoque
        images: colorImageURLs,
        actived: colorActived,
        imposto: colorImposto,
        ncm: colorNcm,
        custo: colorCusto,
        product_id: String(product.id),
      };
  
      if (editingColorIndex !== null) {
        setProduct(prev => {
          const updatedColors = [...prev.colors];
          updatedColors[editingColorIndex] = { ...newColor };
          return { ...prev, colors: updatedColors };
        });
        setEditingColorIndex(null);
      } else {
        setProduct(prev => ({
          ...prev,
          colors: [...prev.colors, newColor],
        }));
      }
  
      setColor('');
      setColorPrice(0);
      setColorStock([]);
      setColorSize([]); // Limpa o array de tamanhos
      setColorImageURLs([]);
      setColorImposto('');
      setColorNcm('');
      setColorCusto('');
    }
  };
  

  const handleEditColor = (index: number) => {
    const colorToEdit = product.colors[index];
    setColor(colorToEdit.name);
    setColorPrice(colorToEdit.price);
    setColorStock(colorToEdit.sizes);
    setColorImageURLs(colorToEdit.images);
    setColorImposto(String(colorToEdit.imposto)),
    setColorNcm(String(colorToEdit.ncm)),
    setColorActived(Boolean(colorToEdit.actived)),
    setColorNcm(String(colorToEdit.ncm)),
    setColorCusto(String(colorToEdit.custo)),
    setEditingColorIndex(index);
  };

  const handleRemoveColor = (index: number) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
  
    // Aqui você faz a chamada para salvar ou atualizar o produto
    productEdit ? await putProductUseCase.execute(product) : await setProductUseCase.execute(product);
  
    fetchProducts();
    onClose();
  };
  
  
  
  
  return (
<div className="form-overlay">
  <div className="form-container">
    <div className="form-content">
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nome do Produto"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />
          <input
            type="text"
            name="afiliado"
            value={product.afiliado}
            onChange={handleChange}
            placeholder={product.afiliado ? product.afiliado : "Fornecedor ou Afiliado"}
            required
          />
          <select
            name="category"
            value={product.category} // Aqui, o valor é o id da categoria
            onChange={handleChange}
          >
            <option value="">Categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>  // Exibe o nome da categoria
            ))}
          </select>

          <select
            name="sub_category"
            value={product.sub_category} // Aqui, o valor é o id da subcategoria
            onChange={handleChange}
          >
            <option value="">Sub Categoria</option>
            {subCategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>  // Exibe o nome da subcategoria
            ))}
          </select>

          <select
            name="relatedProductId"
            value={relatedProductId}
            onChange={(e) => setRelatedProductId(e.target.value)}
          >
            <option value="">Produtos Relacionados</option>
            {products.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>

          <select
            name="destaqued"
            value={String(product.destaqued)} // Convertendo para string
            onChange={handleChange}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <button type="button" className="btn" onClick={handleAddRelatedProduct}>Adicionar Produto Relacionado</button>
          <ul>
            {(product.relatedProducts || []).map((relatedProduct, index) => (
              <li key={index}>
                {products.find(prod => prod.id === relatedProduct)?.name || "Produto não encontrado"}
                <button type="button" onClick={() => handleRemoveRelatedProduct(relatedProduct)}>Remover</button>
              </li>
            ))}
          </ul>

          <input
            type="text"
            placeholder="URL's das Imagens (separadas por * )"
            onChange={handleImageURLChange}
            className="url-input"
          />
          <div className="image-previews">
            {imageURLs.map((url, index) => (
              <div key={index} className="preview-container">
                <img src={url} alt={`Preview ${index}`} className="preview-image" />
                <button type="button" onClick={() => handleRemoveImage(index, false)} className="remove-btn">X</button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" onClick={handleSubmit}>Salvar</button>
            <button type="button" onClick={onClose} className="btn">Cancelar</button>
          </div>
        </form>
        <button 
          className="toggle-shipping-btn" 
          onClick={() => setIsShippingFormOpen(!isShippingFormOpen)}
        >
          {isShippingFormOpen ? "Ocultar Informações de Envio" : "Informações de Envio"}
        </button>

        <div className={`shipping-form ${isShippingFormOpen ? "open" : "closed"}`}>
        <h2>Informações de Envio</h2>
        <label>Peso (g):  
        <input
          type="number"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          placeholder="Peso em gramas"
        />
      </label>

      <label>Altura (cm):  
        <input
          type="number"
          name="height"
          value={product.height}
          onChange={handleChange}
          placeholder="Altura em cm"
        />
      </label>

      <label>Largura (cm):  
        <input
          type="number"
          name="width"
          value={product.width}
          onChange={handleChange}
          placeholder="Largura em cm"
        />
      </label>

      <label>Comprimento (cm):  
        <input
          type="number"
          name="length"
          value={product.length}
          onChange={handleChange}
          placeholder="Comprimento em cm"
        />
      </label>

      <label>Formato da Embalagem:  
        <select
          name="package"
          value={product.package_format}
          onChange={handleChange}
        >
          <option value="box">Caixa</option>
          <option value="roll">Rolo</option>
          <option value="envelope">Envelope</option>
        </select>
      </label>

      <label>Valor do Seguro (R$):  
        <input
          type="number"
          name="declared_value"
          value={product.declared_value}
          onChange={handleChange}
          placeholder="Valor do Seguro"
        />
      </label>
      </div>

      </div>
      <div className="color-form">
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          placeholder="Adicionar Cor"
        />
        <label htmlFor="colorPrice">Preço:</label>
        <input
          name="colorPrice"
          type="number"
          value={colorPrice}
          onChange={handleColorPriceChange}
          placeholder="Preço"
        />
        <label htmlFor="colorStock">Estoque:</label>
        <label htmlFor="colorSize">Tamanhos e Estoque:</label>
        <input
          type="text"
          placeholder="Tamanho (ex: P, M, G) e Estoque (separados por vírgula, ex: P-10, M-20)"
          onChange={handleColorSizeChange}
        />

        <label htmlFor="colorNcm">NCM:</label>
        <input
          name="colorNcm"
          type="string"
          value={colorNcm}
          onChange={handleColorNcmChange}
          placeholder="NCM"
        />

        <ul className="color-form-v">
          <li>
            <label htmlFor="colorCusto">Custo:</label>
            <input
              name="colorCusto"
              type="number"
              value={colorCusto}
              onChange={handleColorCustoChange}
              placeholder="Custo"
            />
          </li>
          <li>
            <label htmlFor="colorImposto">Imposto:</label>
            <input
              name="colorImposto"
              type="number"
              value={colorImposto}
              onChange={handleColorImpostoChange}
              placeholder="Imposto"
            />
          </li>
          <li>
            <label htmlFor="colorMargem">Margem:</label>
            <input
              name="colorMargem"
              type="number"
              placeholder="Margem"
              onChange={handleMarginInput}
            />
          </li>
          <li>
            {valueMargin && (<label>Valor Sugerido: {valueMargin}</label>)}
          </li>
          <button className="btn" onClick={handleCalc}>Calcular</button>
        </ul>

        <input
          type="text"
          placeholder="URL's das Imagens (separadas por * )"
          onChange={handleColorImageURLChange}
          className="url-input"
        />
        <div className="color-image-previews">
          {colorImageURLs.map((url, index) => (
            <div key={index} className="preview-container">
              <img src={url} alt={`Color Preview ${index}`} className="preview-image" />
              <button type="button" onClick={() => handleRemoveImage(index, true)} className="remove-btn">X</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddColor} className="btn">
          {editingColorIndex !== null ? "Editar Cor" : "Adicionar Cor"}
        </button>
        
        <div className="colors-list">
          {product.colors.map((color, index) => (
            <div key={index}>
              <p>{color.name}</p>
              <p>Preço: {color.price.toFixed(2)}</p>
              <p>Estoque por tamanho:</p>
              <ul>
                {color.sizes.map((size, i) => (
                  <li key={i}>{size.name}: {size.quantity}</li>
                ))}
              </ul>
              <div className="color-image-previews">
                {color.images.map((url, i) => (
                  <div key={i} className="preview-container">
                    <img src={url} alt={`Color Image ${i}`} className="preview-image" />
                  </div>
                ))}
              </div>
              <div className="color-actions">
                <button type="button" onClick={() => handleEditColor(index)} className="color-edit-btn">Editar</button>
                <button type="button" onClick={() => handleRemoveColor(index)} className="color-remove-btn">Apagar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
