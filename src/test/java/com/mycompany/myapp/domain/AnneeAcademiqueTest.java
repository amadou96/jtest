package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class AnneeAcademiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnneeAcademique.class);
        AnneeAcademique anneeAcademique1 = new AnneeAcademique();
        anneeAcademique1.setId(1L);
        AnneeAcademique anneeAcademique2 = new AnneeAcademique();
        anneeAcademique2.setId(anneeAcademique1.getId());
        assertThat(anneeAcademique1).isEqualTo(anneeAcademique2);
        anneeAcademique2.setId(2L);
        assertThat(anneeAcademique1).isNotEqualTo(anneeAcademique2);
        anneeAcademique1.setId(null);
        assertThat(anneeAcademique1).isNotEqualTo(anneeAcademique2);
    }
}
