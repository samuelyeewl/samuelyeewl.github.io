---
layout: page
title: photographs
permalink: /albums/
description: photos i've taken
---

{% for album in site.albums %}

<div class="album ">
    <div class="thumbnail">
        <a href="{{ album.url | prepend: site.baseurl | prepend: site.url }}">
        {% if album.cover %}
        <img class="thumbnail" src="{{ album.cover | prepend: site.baseurl | prepend: site.url }}"/>
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
</div>

{% endfor %}
