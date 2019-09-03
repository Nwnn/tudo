<template>
    <div>
        <div>
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand><n-link to="/">tudo</n-link></b-navbar-brand>
            

            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-text>1/2 10:50　</b-nav-text>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-text><n-link to="task">タスク追加</n-link></b-nav-text>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>

        <nuxt/>

    </div>
    
</template>
