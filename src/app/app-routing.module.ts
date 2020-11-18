import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  {
    path: 'admin-usuario',
    loadChildren: () => import('./admin/usuario/usuario.module').then( m => m.UsuarioModule)
  },
  {
    path: 'cadastro-produto',
    loadChildren: () => import('./cadastro-produto/cadastro-produto.module').then( m => m.CadastroProdutoPageModule)
  },
  {
    path: 'cadastro-estabelecimento',
    loadChildren: () => import('./cadastro-estabelecimento/cadastro-estabelecimento.module').then( m => m.CadastroEstabelecimentoModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.module').then( m => m.RelatoriosPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'detalhes-vendas',
    loadChildren: () => import('./detalhes-vendas/detalhes-vendas.module').then( m => m.DetalhesVendasPageModule)
  },
  {
    path: 'lancamento',
    loadChildren: () => import('./lancamento/lancamento.module').then( m => m.LancamentoPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
