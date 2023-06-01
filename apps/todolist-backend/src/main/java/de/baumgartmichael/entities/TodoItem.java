package de.baumgartmichael.entities;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class TodoItem extends PanacheEntity {
    public String todoText;
    public boolean isChecked;
}