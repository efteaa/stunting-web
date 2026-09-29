# Model ML final

Taruh model hasil training skripsi di folder ini dengan nama:

`stunting_model.joblib`

Paling aman, simpan **seluruh preprocessing + classifier** sebagai satu `sklearn.pipeline.Pipeline` atau `imblearn.pipeline.Pipeline`, bukan classifier saja.

Contoh di notebook:

```python
import joblib
joblib.dump(best_pipeline, "stunting_model.joblib")
```

Kontrak input API saat ini menyediakan kolom:
`age_month`, `gender`, `height_cm`, `weight_kg`, `birth_weight_kg`, `birth_length_cm`, `breastfeeding`, `parent_education`, `economic_index`.

Sesuaikan nama kolom ini dengan dataset/model final. Jangan mengklaim akurasi, precision, recall, atau F1-score di website sebelum angka tersebut benar-benar berasal dari evaluasi model final pada test set.
