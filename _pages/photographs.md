---
layout: page
title: photographs
permalink: /albums/
description: photos i've taken
---

{% for album in site.albums %}
{% assign album_path = album.title | prepend: "/img/albums/" | prepend: site.asset_path | append: "/" %}

<div class="album-link">
    <a href="{{ album.url | prepend: site.baseurl | prepend: site.url }}">
    {% if album.cover %}
    <img src="{{ album.cover | prepend: album_path }}"/>
    {% else %}
    <div class="thumbnail blankbox"></div>
    {% endif %}    
    <span>
        <h1>{{ album.title }}</h1>
        <br/>
        <p>{{ album.description }}</p>
    </span>
    </a>
</div>

{% endfor %}
