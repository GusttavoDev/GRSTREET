'use client'

import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList/CategoryList";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";
import ListCategoriesUseCase from "@/connection/Categories/UseCases/ListCategoriesUseCase";
import ListSubCategoriesUseCase from "@/connection/SubCategories/UseCases/ListSubCategoriesUseCase";
import ListConfigUseCase from "@/connection/Config/UseCases/ListConfigUseCase";
import UpdateConfigUseCase from "@/connection/Config/UseCases/UpdateConfigUseCase";
import IConfig from "@/entities/IConfig";

import './Config.css'
import Loading from "@/app/components/loading/Loading";

const categoriesUseCase = new ListCategoriesUseCase();
const subCategoriesUseCase = new ListSubCategoriesUseCase();
const listConfigUseCase = new ListConfigUseCase();
const updateConfigUseCase = new UpdateConfigUseCase();

export default function Config() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [subcategories, setSubCategories] = useState<ISubCategory[]>();
  const [config, setConfig] = useState<IConfig>();
  const [loading, setLoading] = useState(true);

  // Função para buscar as configurações
  const fetchConfig = async () => {
    const response: IConfig[] = await listConfigUseCase.execute();
    
    setConfig(response[0]);
  }
  
  // Função para buscar as categorias
  const fetchCategories = async () => {
    const response = await categoriesUseCase.execute();
    setCategories(response);
    
    // Busca as subcategorias para cada categoria
    const subCategoriesResponses = await Promise.all(
      response.map((cat) => subCategoriesUseCase.execute(cat.id))
    );
    
    setLoading(false);
    setSubCategories(subCategoriesResponses.flat());
  };

  useEffect(() => {
    fetchCategories();
    fetchConfig();
  }, []);

  // Funções para editar as configurações
  const handleBannerChange = (bannerNumber: number, newValue: string) => {
    if (config) {
      const updatedConfig = { ...config };
      switch (bannerNumber) {
        case 1:
          updatedConfig.banner1 = newValue;
          break;
        case 2:
          updatedConfig.banner2 = newValue;
          break;
        case 3:
          updatedConfig.banner3 = newValue;
          break;
        default:
          break;
      }
      setConfig(updatedConfig);
    }
  };

  const handleQuickLinkChange = (linkNumber: number, newValue: string) => {
    if (config) {
      const updatedConfig = { ...config };
      switch (linkNumber) {
        case 1:
          updatedConfig.categorie1 = newValue;
          break;
        case 2:
          updatedConfig.categorie2 = newValue;
          break;
        case 3:
          updatedConfig.categorie3 = newValue;
          break;
        default:
          break;
      }
      setConfig(updatedConfig);
      console.log(config)
    }
  };  

  const handleNameChange = (categoryNumber: number, newName: string) => {
    if (config) {
      const updatedConfig = { ...config };
      switch (categoryNumber) {
        case 1:
          updatedConfig.categorie1 = newName;
          break;
        case 2:
          updatedConfig.categorie2 = newName;
          break;
        case 3:
          updatedConfig.categorie3 = newName;
          break;

        default:
          break;
      }
      setConfig(updatedConfig);
    }
  };

  // Função para salvar as configurações
  const handleSave = async () => {
    try {
      if(config) await updateConfigUseCase.execute(config);

      alert('Configurações salvas!');
    } catch (error: unknown) {
      console.log(error)
    }
  };

  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="config-section">
        <h2>Configurações</h2>
        {config && (
          <>
        <div className="banners">
          <h1>Banners</h1>
            {/* Banner 1 */}
            <div className="config-item">
              <label><strong>Banner 1:</strong></label>
              <input 
                type="text" 
                value={config.banner1} 
                onChange={(e) => handleBannerChange(1, e.target.value)} 
                placeholder="Digite o link do banner 1" 
              />
              {config.banner1 && <img src={config.banner1} alt="Banner 1" width="100" />}
            </div>

            {/* Banner 2 */}
            <div className="config-item">
              <label><strong>Banner 2:</strong></label>
              <input 
                type="text" 
                value={config.banner2} 
                onChange={(e) => handleBannerChange(2, e.target.value)} 
                placeholder="Digite o link do banner 2" 
              />
              {config.banner2 && <img src={config.banner2} alt="Banner 2" width="100" />}
            </div>

            {/* Banner 3 */}
            <div className="config-item">
              <label><strong>Banner 3:</strong></label>
              <input 
                type="text" 
                value={config.banner3} 
                onChange={(e) => handleBannerChange(3, e.target.value)} 
                placeholder="Digite o link do banner 3" 
              />
              {config.banner3 && <img src={config.banner3} alt="Banner 3" width="100" />}
            </div>
            </div>

            <div className="linksrapidos">
              <h1>Links Rápidos</h1>
              <input 
                type="text" 
                placeholder="Primeiro Link" 
                value={config.categorie1} 
                onChange={(e) => handleQuickLinkChange(1, e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Segundo Link" 
                value={config.categorie2} 
                onChange={(e) => handleQuickLinkChange(2, e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Terceiro Link" 
                value={config.categorie3} 
                onChange={(e) => handleQuickLinkChange(3, e.target.value)} 
              />
            </div>
            {/* Repita para outras categorias e imagens conforme necessário */}

            {/* Botão de salvar */}
            <button onClick={handleSave}>Salvar</button>
          </>
        )}
      </div>

      <div className="categories-section">
        {categories && subcategories && (
          <CategoryList
            categories={categories}
            subCategories={subcategories}
            fetchCategories={fetchCategories} // Passando a função como prop
          />
        )}
      </div>
    </div>
  );
}
