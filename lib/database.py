from lib import merge

def db_merge(queryset, expected, key_fn):
    a = merge.key(queryset, key_fn)
    b = merge.key(expected, key_fn)
    new_objects = []
    del_objects = []
    fields = queryset.model._meta.get_fields()
    for (x, y) in merge.merge(a, b):
        if x is None:   # add object
            new_objects.append(y)
        elif y is None: # delete object
            x.delete()
        else:           # update object
            changed = False
            for field in fields:
                if field.auto_created:
                    continue
                if getattr(x, field.name) != getattr(y, field.name):
                    setattr(x, field.name, getattr(y, field.name))
                    changed = True
            if changed:
                x.save()
    if new_objects:
        queryset.model.objects.bulk_create(new_objects)
