<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    public function index()
    {

        

        return Inertia::render('Empresas/EmpresasIndex', [

            'user'     => User::findOrFail(1),
            
        ]);

    }
}
