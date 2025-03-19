'use client';

import React, { useEffect, useState, Suspense } from 'react';
import './style.css';
import IProduct from '@/entities/IProduct';
import ICategory from '@/entities/ICategory';
import ListProductsUseCase from '@/connection/Product/UseCases/ListProductsUseCase';
import ListCategoriesUseCase from '@/connection/Categories/UseCases/ListCategoriesUseCase';
import { useRouter, useSearchParams } from 'next/navigation';
import NavBar from '@/app/components/navbar/NavBar';
import Loading from '@/app/components/loading/Loading';

const listProductsUseCase = new ListProductsUseCase();
const listCategoriesUseCase = new ListCategoriesUseCase();

function SearchParamsWrapper({ setSelectedCategory, categories }: { setSelectedCategory: (id: string | undefined) => void; categories: ICategory[] | undefined }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get('category') || undefined;
        if (categories && searchQuery) {
            const newCategoryQuery = categories.filter((category: ICategory) => category.name === searchQuery);
            if (newCategoryQuery.length > 0) {
                setSelectedCategory(String(newCategoryQuery[0].id));
            }
        }
    }, [searchParams, categories]);

    return null;
}

export default function Products({ params }: { params: string }) {
    const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
    const [categories, setCategories] = useState<ICategory[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');
    const router = useRouter();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const req = await listProductsUseCase.execute();
                const formattedProducts = req.map((product: any) => ({
                    ...product,
                    category: product.categoryId,
                    sub_category: product.subCategoryId,
                }));
                setProducts(formattedProducts);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchCategories() {
            try {
                const response = await listCategoriesUseCase.execute();
                setCategories(response);
            } catch (error) {
                console.error('Erro ao buscar as categorias:', error);
            }
        }

        fetchProducts();
        fetchCategories();
    }, [params]);

    const filteredProducts = products?.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) && !product.name.toLowerCase().includes('#inativo');
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesPrice = product.colors[0].price >= minPrice && product.colors[0].price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = filteredProducts?.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'priceAsc') {
            return a.colors[0].price - b.colors[0].price;
        } else if (sortBy === 'priceDesc') {
            return b.colors[0].price - a.colors[0].price;
        }
        return 0;
    });

    if (loading) {
        return <Loading />;
    }

    const updateSearchParams = (key: string, value: string | undefined) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/Products?${params.toString()}`);
    };

    const handleViewMore = (productId: string) => {
        router.push(`/Products/${productId}`);
    };

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="products-container">
                <h1 className="products-title">Nossos Produtos</h1>

                <div className="layout-container-products">
                    <div className="filters-container">
                        <input
                            type="text"
                            placeholder="Pesquisar produtos..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                updateSearchParams('search', e.target.value);
                            }}
                            className="search-bar"
                        />

                        <select
                            value={selectedCategory || ''}
                            onChange={(e) => {
                                const value = e.target.value || undefined;
                                setSelectedCategory(value);
                                updateSearchParams('category', value);
                            }}
                            className="category-select"
                        >
                            <option value="">Todas as categorias</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <div className="price-filter">
                            <label>Preço: R$ {minPrice} - R$ {maxPrice}</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="price-range"
                            />
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value as 'name' | 'priceAsc' | 'priceDesc');
                            }}
                            className="sort-select"
                        >
                            <option value="name">Ordenar por Nome</option>
                            <option value="priceAsc">Ordenar por Preço (menor para maior)</option>
                            <option value="priceDesc">Ordenar por Preço (maior para menor)</option>
                        </select>
                    </div>

                    <div className="products-grid">
                        {sortedProducts && sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.images[0]} alt={product.name} className="product-image-products" />
                                    <h2 className="product-name">{product.name}</h2>
                                    <p className="product-price">R$ {product.colors[0].price.toFixed(2)}</p>

                                    <div className="product-colors">
                                        {product.colors.map((color) => (
                                            <div className="product-color" key={color.id}>
                                                <img src={color.images[0]} alt={color.name} />
                                                <span className="product-color-name">{color.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="view-button" onClick={() => handleViewMore(product.id!)}>Ver Mais</button>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum produto encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
            <Suspense fallback={null}>
                <SearchParamsWrapper setSelectedCategory={setSelectedCategory} categories={categories} />
            </Suspense>
        </>
    );
}
